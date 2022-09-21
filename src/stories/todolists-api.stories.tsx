import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    const createTodoList = () => {
        const title = "React"
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <div>
            <button onClick={createTodoList}>Create Todolist</button>
        </div>
    </div>

}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodoList = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input placeholder={"TodolistID"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <button onClick={deleteTodoList}>Delete Todolist</button>
        </div>
    </div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    // useEffect(() => {
    //     const todolistId = 'd6e91e44-5933-4765-877a-bee86a7a2cc0'
    //     const title = 'SOME NEW TITLE'
    //     const promise = todolistAPI.updateTodolist(todolistId, title)
    //     // todolistAPI.updateTodolist(todolistId, title)
    //     promise.then((res) => {
    //         setState(res.data)
    //     })
    // }, [])

    const updateTitle = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res)=> {
                setState(res.data)
            })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input placeholder={'Todolist ID'} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'New Todolist Title'} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <button onClick={updateTitle}>Update Todolist Title</button>
        </div>

    </div>
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>Get tasks</button>
        </div>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTasks = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskID'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTasks}>Delete tasks</button>
        </div>
    </div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const createTask = () => {
        taskAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const [title, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('description 1')
    const [completed, setCompleted] = useState<number>(0)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')


    const createTask = () => {
        taskAPI.updateTask(todolistId, taskId, {
            deadline: deadline,
            priority: priority,
            description: description,
            title: title,
            status: status,
            startDate: startDate,
            order:0,
            id: taskId,
            addedDate:"",
            todoListId: todolistId
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'task ID'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={'Task Title'} value={title} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={'Description'} value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/>
            <input placeholder={'Status'} value={status} onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>
            <input placeholder={'priority'} value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Update task</button>
        </div>
    </div>
}

// d7a8855f-1cad-4d3e-a5fc-a939c6895fe0




