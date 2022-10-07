import axios, {AxiosResponse} from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1909a996-577e-417f-8ed9-b0307898e20c'
    }
})


//API
export const todolistAPI = {
    updateTodolist(title: string, todolistId: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title})
    },
    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists/`,)
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
}
export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`,)
    },
    createTask(todolistId:string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, object: TaskType, taskId: string) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, object)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<any>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>(`auth/login`, data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
    },
    me(){
        return instance.get<ResponseType<MeType>>(`auth/me`)

    }
}


//types
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
export type TaskType = {
    id: string,
    title: string
    description: string
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
export enum StatusCode {
    OK = 0,
    ERROR = 1,
    CAPTCHA = 10,
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}
export type MeType = {
    id: number
    email: string
    login: string
}







