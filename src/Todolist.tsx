import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterValuesType} from "./reducers/todolists-reducer";
import {TaskStatus, TaskType} from "./api/todolist-api";
import {fetchTasks} from "./reducers/tasks-reducer";
import {useAppDispatch} from "./reducers/store";
import {RequestStatusType} from "./reducers/app-reducer";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatus, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    entityStatus: RequestStatusType
}

export const Todolist = React.memo ((props: PropsType) => {

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTasks(props.id))
    }, [])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    },[props.id, props.addTask])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);


    let tasks = props.tasks;
    let tasksForTodolist = tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatus.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatus.Completed);
    }


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton aria-label="delete" onClick={removeTodolist} disabled={props.entityStatus === "loading"} >
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                tasksForTodolist.map(t => {
                    const removeTask = (taskId: string) => props.removeTask(taskId, props.id)
                    const changeTaskTitle = (taskId: string, newTaskTitle: string) => {
                        props.changeTaskTitle(taskId, newTaskTitle, props.id);
                    }
                    const changeTaskStatus = (taskId: string, newTaskTitle: TaskStatus) => {
                        props.changeTaskStatus(taskId, newTaskTitle, props.id);
                    }

                    return <Task key={t.id} todolistId={props.id} task={t} removeTask={removeTask} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
                })
            }
        </List>
        <div>
            <Button size={"small"}
                    variant={"contained"}
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    disableElevation
                    onClick={onAllClickHandler}>All
            </Button>

            <Button size={"small"}
                    variant={"contained"}
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    style={{marginLeft: "2px"}}
                    disableElevation
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button size={"small"}
                    variant={"contained"}
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    style={{marginLeft: "2px"}}
                    disableElevation
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})


