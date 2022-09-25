import {TasksStateType} from "../App";
import {AddTodolistAT, FetchTodosACType, RemoveTodolistAT} from "./todolists-reducer";
import {taskAPI, TaskPriority, TaskStatus, TaskType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "./store";


export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map( t => t.id === action.taskId ? {...t, ...action.task} : t)}
        case "ADD-TODOLIST":
            return {...state,[action.todolistId]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        case "SET-TODOS":
            const stateCopy = {...state}
            action.todos.forEach((tl) => {stateCopy[tl.id] = []})
            return stateCopy;
        case "SET-TASKS":
            return {...state, [action.todoId]: action.tasks}
        default:
            return state
    }
}

//AC
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)
export const updateTaskAC = (todolistId: string , task: TaskType, taskId: string) => ({type: "UPDATE-TASK", taskId, task, todolistId} as const)
export const setTasks = (todoId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todoId, tasks} as const)


//Thunk
export const fetchTasks = (todoId: string): AppThunk => (dispatch) => {
    taskAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTasks(todoId, res.data.items))
        })
}
export const deleteTaskTC = (todoId: string, taskId: string): AppThunk => (dispatch) => {
    debugger
    taskAPI.deleteTask(todoId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todoId, taskId))
        })
}
export const addTaskTC = (todoId: string, title: string): AppThunk => (dispatch ) => {
    taskAPI.createTask(todoId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todoId: string, domainModel: UpdateTaskType, taskId: string): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    debugger
    const task = getState().tasks[todoId].find(el => el.id === taskId)
        if(!task) {
            console.warn("task not found in the state")
            return
        }
        const apiModel: TaskType = {
            ...task,
            ...domainModel
        }
    taskAPI.updateTask(todoId, apiModel, taskId)
        .then((res) => {
            dispatch(updateTaskAC(todoId, res.data.data.item, taskId))
        })
}


//types
const initialState: TasksStateType = {};

export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistAT
    | RemoveTodolistAT
    | FetchTodosACType
    | ReturnType<typeof setTasks>


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

