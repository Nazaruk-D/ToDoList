import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";
// Тип действия + необходимые данные для этого типа действия

type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTitleStatusAT = ReturnType<typeof changeTaskTitleAC>

const initialState: TasksStateType = {};

type ActionType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT | changeTitleStatusAT | AddTodolistAT | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case "ADD-TASK":
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "CHANGE-STATUS-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].map( t => t.id === action.id ? {...t, isDone: action.isDone} : t)}
        case "CHANGE-TITLE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].map( t => t.id === action.id ? {...t, title: action.title} : t)}
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST" : {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}


export const removeTaskAC =  (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", taskId, todolistId}) as const
export const addTaskAC =  (title: string, todolistId: string) => ({type: "ADD-TASK", title, todolistId}) as const
export const changeTaskStatusAC =  (id: string, isDone: boolean, todolistId: string) => ({type: "CHANGE-STATUS-TASK", id, isDone, todolistId}) as const
export const changeTaskTitleAC =  (id: string, title: string, todolistId: string) => ({type: "CHANGE-TITLE-TASK", id, title, todolistId}) as const


