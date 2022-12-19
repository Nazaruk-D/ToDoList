import {todolistAPI, TodolistType} from "../api/todolist-api";
import {fetchTasks} from "./tasks-reducer";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const fetchTodolistsThunk = createAsyncThunk(('todolists/fetchTodolists'), async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistAPI.getTodolist()
    try {
        res.data.forEach((tl) => {
            dispatch(fetchTasks(tl.id))
        })
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {todos: res.data}
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})


export const deleteTodolistTC = createAsyncThunk(('todolists/deleteTodolist'), async (todoId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    await todolistAPI.deleteTodolist(todoId)
    try {
        dispatch(changeTodolistStatusAC({todolistId: todoId, status: "loading"}))
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {id: todoId}
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const addTodolistTC = createAsyncThunk(('todolists/addTodolistTC'), async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistAPI.createTodolist(title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const changeTodolistTitleTC = createAsyncThunk(('todolists/changeTodolistTitle'), async (param: {title: string, id: string}, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    await todolistAPI.updateTodolist(param.title, param.id)
    try {
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {title: param.title, id: param.id}
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})



const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        clearTodosDataAC(state) {
            return []
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistStatusAC(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsThunk.fulfilled, (state, action) => {
            return action.payload.todos.map(el => ({...el, filter: "all", entityStatus: "idle"}))
        })
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})


export const todolistsreducer = slice.reducer;
export const {changeTodolistFilterAC, changeTodolistStatusAC, clearTodosDataAC} = slice.actions


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type FilterValuesType = "all" | "active" | "completed";



