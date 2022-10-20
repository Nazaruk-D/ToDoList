import {TasksStateType} from "../App";
import {
    addTodolistAC,
    AddTodolistAT,
    ClearTodosDataAT, fetchTodolistAC,
    FetchTodosACType,
    removeTodolistAC,
    RemoveTodolistAT
} from "./todolists-reducer";
import {taskAPI, TaskPriority, TaskStatus, TaskType} from "../api/todolist-api";
import {AppRootStateType, AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {};

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{todolistId: string, taskId: string}>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if(index > -1) {
                tasks.splice(index, 1);
            }
        },
        addTaskAC(state, action: PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{todolistId: string, task: TaskType, taskId: string}>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if(index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.task }
            }
        },
        setTasks(state, action: PayloadAction<{todoId: string, tasks: TaskType[]}>) {
                state[action.payload.todoId] = action.payload.tasks
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTodolistAC, (state, action) => {
            action.payload.todos.forEach((tl:any) => {
                state[tl.id] = []
            })
        })
    }
})


export const tasksReducer = slice.reducer;
export const {removeTaskAC, addTaskAC, updateTaskAC,setTasks} = slice.actions
// export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
//     switch (action.type) {
//         case "REMOVE-TASK":
//             return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
//         case "ADD-TASK":
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         case "UPDATE-TASK":
//             return {
//                 ...state, [action.todolistId]: state[action.todolistId]
//                     .map(t => t.id === action.taskId ? {...t, ...action.task} : t)
//             }
//         case "ADD-TODOLIST":
//             return {...state, [action.todolist.id]: []}
//         case "REMOVE-TODOLIST":
//             let copyState = {...state}
//             delete copyState[action.id]
//             return copyState
//         case "SET-TODOS":
//             const stateCopy = {...state}
//             action.todos.forEach((tl) => {
//                 stateCopy[tl.id] = []
//             })
//             return stateCopy;
//         case "SET-TASKS":
//             return {...state, [action.todoId]: action.tasks}
//         case "CLEAR-DATA":
//             return {}
//         default:
//             return state
//     }
// }

//AC
// export const removeTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", taskId, todolistId} as const)
// export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)
// export const updateTaskAC = (todolistId: string, task: TaskType, taskId: string) => ({
//     type: "UPDATE-TASK",
//     taskId,
//     task,
//     todolistId
// } as const)
// export const setTasks = (todoId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todoId, tasks} as const)
//

//Thunk
export const fetchTasks = (todoId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    taskAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTasks({todoId,tasks: res.data.items}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch)
    })
}
export const deleteTaskTC = (todoId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    taskAPI.deleteTask(todoId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({todolistId: todoId,taskId: taskId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch)
    })
}
export const addTaskTC = (todoId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    taskAPI.createTask(todoId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                // if (res.data.messages[0]){
                //     dispatch(setAppErrorAC(res.data.messages[0]))
                // } else {
                //     dispatch(setAppErrorAC("some error"))
                // }
                // dispatch(setAppStatusAC("failed"))
                // handleServerAppError<{item: TaskType}>(res.data, dispatch)
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e: AxiosError) => {
        // dispatch(setAppStatusAC("failed"))
        // dispatch(setAppErrorAC(e.message))
        handleServerNetworkError(e, dispatch)
    })
}
export const updateTaskTC = (todoId: string, domainModel: UpdateTaskType, taskId: string): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoId].find(el => el.id === taskId)
    if (!task) {
        console.warn("task not found in the state")
        return
    }
    const apiModel: TaskType = {
        ...task,
        ...domainModel
    }
    dispatch(setAppStatusAC({status: "loading"}))
    taskAPI.updateTask(todoId, apiModel, taskId)
        .then((res) => {
            dispatch(updateTaskAC({todolistId: todoId,task: res.data.data.item,taskId: taskId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
        // dispatch(setAppStatusAC("failed"))
        // dispatch(setAppErrorAC(e.message))
    })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}


//types


export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistAT
    | RemoveTodolistAT
    | FetchTodosACType
    | ReturnType<typeof setTasks>
    // | SetAppErrorProps
    | ClearTodosDataAT


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

