import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "./components/AddItemForm";
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./reducers/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    fetchTodolistsThunk,
    FilterValuesType,
    TodolistDomainType
} from "./reducers/todolists-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "./reducers/tasks-reducer";
import {TaskStatus} from "./api/todolist-api";
import {TasksStateType} from "./App";
import {Navigate} from "react-router-dom";


export const TodolistsList = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!isLoggedIn){
            return
        }
        dispatch(fetchTodolistsThunk())
    }, [])

    //tasks:
    const removeTask = useCallback((id: string, todolistId: string) => {
        let action = deleteTaskTC(todolistId, id)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, {title: newTitle}, id))
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatus, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, {status}, id))
    }, [dispatch])

    //todolist:
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        let action = deleteTodolistTC(id);
        dispatch(action)
    }, [dispatch])

    function changeTodolistTitle(id: string, title: string) {
        dispatch(changeTodolistTitleTC(title, id))
    }

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistTC(title)
        dispatch(action)
    }, [dispatch])


    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div>
            <Grid container style={{padding: "20px 0"} }>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {todolists.map(tl => {
                    return (
                        <Grid item key={tl.id} xs={3} style={{height: "100%"}}>
                            <Paper style={{padding: "20px", backgroundColor: "rgba(255, 255, 255, 0.5)"}} elevation={8} >
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    entityStatus={tl.entityStatus}
                                />
                            </Paper>
                        </Grid>)
                })
                }
            </Grid>
        </div>
    );
};
