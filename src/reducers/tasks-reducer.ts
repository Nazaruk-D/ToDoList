import {TasksStateType} from "../App/App";
import {addTodolistTC, deleteTodolistTC, fetchTodolistsThunk} from "./todolists-reducer";
import {StatusCode, taskAPI, TaskPriority, TaskStatus, TaskType} from "../api/todolist-api";
import {AppRootStateType} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: TasksStateType = {};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await taskAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (err: any) {
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: err.data.messages, fieldErrors: err.data.fieldsErrors})
    }
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (params: { todoId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await taskAPI.deleteTask(params.todoId, params.taskId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolistId: params.todoId, taskId: params.taskId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: err.data.messages, fieldErrors: err.data.fieldsErrors})
    }
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (params: { todoId: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await taskAPI.createTask(params.todoId, params.title)
        if (res.data.resultCode === StatusCode.OK) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({errors: res.data.messages, fieldErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue({errors: err.data.messages, fieldErrors: err.data.fieldsErrors})
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (params: { todoId: string, domainModel: UpdateTaskType, taskId: string }, {dispatch, rejectWithValue, getState}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const state = getState() as AppRootStateType
    const task = state.tasks[params.todoId].find(el => el.id === params.taskId)

    if (!task) {
        return rejectWithValue(null)
    }

    const apiModel: TaskType = {
        ...task,
        ...params.domainModel
    }
    try {
        const res = await taskAPI.updateTask(params.todoId, apiModel, params.taskId)
        if (res.data.resultCode === StatusCode.OK) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolistId: params.todoId, task: res.data.data.item, taskId: params.taskId}
        } else {
            return rejectWithValue({errors: res.data.messages, fieldErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue({errors: err.data.messages, fieldErrors: err.data.fieldsErrors})
    } finally {
        dispatch(setAppStatusAC({status: "idle"}))

    }
})

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        })
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTodolistsThunk.fulfilled, (state, action) => {
            action.payload.todos.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload!.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload!.taskId)
            if (index > -1) {
                tasks.splice(index, 1);
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.task}
            }
        })
    }
})

export const tasksReducer = slice.reducer;

export type UpdateTaskType = {
    id?: string,
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: any
    deadline?: any
    todoListId?: string
    addedDate?: string
    order?: number
}

