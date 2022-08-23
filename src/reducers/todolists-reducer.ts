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
type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsreducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            // let newTodolistId = v1();
            let newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'};
            return [...todolists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {
                ...tl, title: action.title
            } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {
                ...tl, filter: action.filter
            } : tl)
        default:
            return todolists
    }
}


export const ReamoveTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title, todolistId: v1()})
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title,
    id
})
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter,
    id
})

