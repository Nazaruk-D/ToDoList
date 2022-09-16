import axios from 'axios'


type TodolistType = {
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



export type ResponseTaskType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type objectTAskType = {
    title: string
    description: string
    completed: boolean
    status: any
    priority: any
    startDate: any
    deadline: any
}


export const taskAPI = {
    getTasks(todolistId:string) {
        return instance.get<TodolistType>(`todo-lists/${todolistId}/tasks`,)
    },
    createTask(todolistId:string, title: string) {
        return instance.post<ResponseTaskType<objectTAskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, object: objectTAskType) {
        return instance.put<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, object)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}




