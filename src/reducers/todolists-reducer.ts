import {v1} from "uuid";
import {taskAPI, TaskType, todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppThunk} from "./store";
import {fetchTasks, removeTaskAC} from "./tasks-reducer";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export const todolistsreducer = (state = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOS":
            return action.todos.map(el => ({...el, filter: "all", entityStatus: "idle"}))
        case "TODO/CHANGE-TODOLIST-STATUS":
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        case "CLEAR-DATA":
            return []
        default:
            return state
    }
}

//AC
export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const clearTodosDataAC = () => ({type: "CLEAR-DATA"} as const)
export const changeTodolistTitleAC = (title: string, id: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    title,
    id
} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter,
    id
} as const)
export const fetchTodolistAC = (todos: TodolistType[]) => ({type: "SET-TODOS", todos} as const)
export const changeTodolistStatusAC = (todolistId: string, status: RequestStatusType) => ({
    type: "TODO/CHANGE-TODOLIST-STATUS",
    status,
    todolistId
} as const)


//Thunk
export const fetchTodolistsThunk = (): AppThunk => (dispatch) => {  ///Пофиксить типизацию
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTodolist()
        .then((res) => {
            console.log(res.data)
            dispatch(fetchTodolistAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
            return res.data
        }).then((todos) => {
        todos.forEach((tl) => {
            dispatch(fetchTasks(tl.id))
        })
    })

        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const deleteTodolistTC = (todoId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistStatusAC(todoId, "loading"))
    todolistAPI.deleteTodolist(todoId)
        .then(() => {
            dispatch(removeTodolistAC(todoId))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}


export const changeTodolistTitleTC = (title: string, id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.updateTodolist(title, id)
        .then(() => {
            dispatch(changeTodolistTitleAC(title, id))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}


//types
const initialState: Array<TodolistDomainType> = [];


export type FetchTodosACType = ReturnType<typeof fetchTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistStatusAT = ReturnType<typeof changeTodolistStatusAC>
export type ClearTodosDataAT = ReturnType<typeof clearTodosDataAC>


export type TodolistsActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | FetchTodosACType
    | ChangeTodolistStatusAT
    | ClearTodosDataAT

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type FilterValuesType = "all" | "active" | "completed";



