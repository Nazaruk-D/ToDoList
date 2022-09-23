import {v1} from "uuid";
import {taskAPI, todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppThunk} from "./store";
import {removeTaskAC} from "./tasks-reducer";

export const todolistsreducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            let newTodolist: TodolistDomainType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: "",
                order: 0,
            };
            return [newTodolist, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOS":
            return action.todos.map(el => ({...el, filter: "all"}))
        default:
            return state
    }
}

//AC
export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (title: string) => ({type: "ADD-TODOLIST", title, todolistId: v1()} as const)
export const changeTodolistTitleAC = (title: string, id: string) => ({type: "CHANGE-TODOLIST-TITLE", title,id} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({    type: "CHANGE-TODOLIST-FILTER", filter, id} as const)
export const fetchTodolistAC = (todos: TodolistType[]) => ({type: "SET-TODOS", todos} as const)


//Thunk
export const fetchTodolistsThunk = () => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(fetchTodolistAC(res.data))
        })
}

export const deleteTodolistTC = (todoId: string): AppThunk => (dispatch) => {
    todolistAPI.deleteTodolist(todoId)
        .then(() => {
            dispatch(removeTodolistAC(todoId))
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistAPI.createTodolist(title)
        .then(() => {
            dispatch(addTodolistAC(title))
        })
}

export const changeTodolistTitleTC = (title: string, id: string): AppThunk => (dispatch) => {
    todolistAPI.updateTodolist(title, id)
        .then(() => {
            dispatch(changeTodolistTitleAC(title, id))
        })
}

//types
const initialState: Array<TodolistDomainType> = [];


export type FetchTodosACType = ReturnType<typeof fetchTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>

type ActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | FetchTodosACType

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";



