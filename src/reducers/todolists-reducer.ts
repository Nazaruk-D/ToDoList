import {todolistAPI, TodolistType} from "../api/todolist-api";
import {AppThunk} from "./store";
import {fetchTasks} from "./tasks-reducer";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: Array<TodolistDomainType> = [];

const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if(index !== -1) {
                state.splice(index, 1)
            }
            // return state.filter(tl => tl.id != action.payload.id)
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) {
                        state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})

        },
        clearTodosDataAC(state) {
            return []
        },
        changeTodolistTitleAC(state, action: PayloadAction<{title: string, id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{filter: FilterValuesType, id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        fetchTodolistAC(state, action: PayloadAction<{todos: TodolistType[]}>) {
            return action.payload.todos.map(el => ({...el, filter: "all", entityStatus: "idle"}))
        },
        changeTodolistStatusAC(state, action: PayloadAction<{todolistId: string, status: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
    }
})





export const todolistsreducer = slice.reducer;
export const {addTodolistAC,removeTodolistAC, changeTodolistFilterAC,changeTodolistTitleAC,changeTodolistStatusAC,fetchTodolistAC,clearTodosDataAC} = slice.actions
// (state = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case "REMOVE-TODOLIST":
//             return state.filter(tl => tl.id != action.id)
//         case "ADD-TODOLIST":
//             return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
//         case "CHANGE-TODOLIST-TITLE":
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//         case "CHANGE-TODOLIST-FILTER":
//             return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         case "SET-TODOS":
//             return action.todos.map(el => ({...el, filter: "all", entityStatus: "idle"}))
//         case "TODO/CHANGE-TODOLIST-STATUS":
//             return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
//         case "CLEAR-DATA":
//             return []
//         default:
//             return state
//     }
// }

//AC
// export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
// export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
// export const clearTodosDataAC = () => ({type: "CLEAR-DATA"} as const)
// export const changeTodolistTitleAC = (title: string, id: string) => ({
//     type: "CHANGE-TODOLIST-TITLE",
//     title,
//     id
// } as const)
// export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
//     type: "CHANGE-TODOLIST-FILTER",
//     filter,
//     id
// } as const)
// export const fetchTodolistAC = (todos: TodolistType[]) => ({type: "SET-TODOS", todos} as const)
// export const changeTodolistStatusAC = (todolistId: string, status: RequestStatusType) => ({
//     type: "TODO/CHANGE-TODOLIST-STATUS",
//     status,
//     todolistId
// } as const)


//Thunk
export const fetchTodolistsThunk = (): AppThunk => (dispatch) => {  ///Пофиксить типизацию
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(fetchTodolistAC({todos: res.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))
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
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistStatusAC({todolistId: todoId,status: "loading"}))
    todolistAPI.deleteTodolist(todoId)
        .then(() => {
            dispatch(removeTodolistAC({id: todoId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}


export const changeTodolistTitleTC = (title: string, id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.updateTodolist(title, id)
        .then(() => {
            dispatch(changeTodolistTitleAC({title, id}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}


//types


//
// export type FetchTodosACType = ReturnType<typeof fetchTodolistAC>
// export type AddTodolistAT = ReturnType<typeof addTodolistAC>
// export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
// export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
// export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
// export type ChangeTodolistStatusAT = ReturnType<typeof changeTodolistStatusAC>
// export type ClearTodosDataAT = ReturnType<typeof clearTodosDataAC>


// export type TodolistsActionType =
//     RemoveTodolistAT
//     | AddTodolistAT
//     | ChangeTodolistTitleAT
//     | ChangeTodolistFilterAT
//     | FetchTodosACType
//     | ChangeTodolistStatusAT
//     | ClearTodosDataAT

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type FilterValuesType = "all" | "active" | "completed";



