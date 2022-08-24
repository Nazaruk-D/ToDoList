import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
// Тип действия + необходимые данные для этого типа действия

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}

const initialState: Array<TodolistType> = [];

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsreducer = (state = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            // let newTodolistId = v1();
            let newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'};
            return [newTodolist, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {
                ...tl, title: action.title
            } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {
                ...tl, filter: action.filter
            } : tl)
        default:
            return state
    }
}


export const removeTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id})
export const addTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title, todolistId: v1()})
export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title,
    id
})
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter,
    id
})

