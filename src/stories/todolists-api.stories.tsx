import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const promise = todolistAPI.getTodolist()
        // todolistAPI.getTodolist()
        promise.then((res) => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = "React"
        const promise = todolistAPI.createTodolist(title)
        // todolistAPI.createTodolist(title)
        promise.then((res) => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "667c6da6-9eea-431f-b434-e0778284b408";
        const promise = todolistAPI.deleteTodolist(todolistId)
        // todolistAPI.deleteTodolist(todolistId)
        promise.then((res) => {
            // setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = "b211242b-a408-41b9-a7d3-d1ac81af7960";
//         axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: "React-Redux"} ,settings)
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd6e91e44-5933-4765-877a-bee86a7a2cc0'
        const title = 'SOME NEW TITLE'
        const promise = todolistAPI.updateTodolist(todolistId, title)
        // todolistAPI.updateTodolist(todolistId, title)
        promise.then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


