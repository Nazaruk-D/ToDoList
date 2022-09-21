import axios from 'axios'


export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}


export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export type ResponseTaskType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    id: string,
    title: string
    description: string
    // completed: boolean
    status: TaskStatus
    priority: TaskPriority
    startDate: any
    deadline: any
    todoListId: string
    addedDate: string
    order: number
}

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0eaf2c78-b360-4d05-800a-fd9132ed05f7'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists/`,)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
}


export const taskAPI = {
    getTasks(todolistId:string) {
        return instance.get<TodolistType>(`todo-lists/${todolistId}/tasks`,)
    },
    createTask(todolistId:string, title: string) {
        return instance.post<ResponseTaskType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, object: TaskType) {
        return instance.put<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, object)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}




