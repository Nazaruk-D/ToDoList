import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../reducers/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    fetchTodolistsThunk,
    FilterValuesType,
    TodolistDomainType
} from "../../reducers/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../reducers/tasks-reducer";
import {TaskStatus} from "../../api/todolist-api";
import {TasksStateType} from "../../App/App";
import {Navigate} from "react-router-dom";
import s from "./TodolistsList.module.css"

export const TodoLists = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsThunk())
    }, [])

    //todolist:
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({filter: value, id: todolistId}))
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        let action = deleteTodolistTC(id);
        dispatch(action)
    }, [dispatch])

    function changeTodolistTitle(id: string, title: string) {
        dispatch(changeTodolistTitleTC({title, id}))
    }

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistTC(title)
        dispatch(action)
    }, [dispatch])

    //tasks:
    const removeTask = useCallback((taskId: string, todoId: string) => {
        dispatch(removeTaskTC({taskId, todoId}))
    }, [dispatch])
    const addTask = useCallback((title: string, todoId: string) => {
        dispatch(addTaskTC({todoId, title}))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoId: string) => {
        dispatch(updateTaskTC({todoId, domainModel: {title: newTitle}, taskId}))
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, status: TaskStatus, todoId: string) => {
        dispatch(updateTaskTC({todoId, domainModel: {status}, taskId}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className={s.td}>
            <Grid container style={{padding: "20px 0"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4} className={s.grid}>
                {todoLists.map(tl => {
                    return (
                        <Grid item key={tl.id} xs={"auto"} style={{height: "100%", justifyContent: "center"}}>
                            <Paper className={s.todolistContainer} style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                                   elevation={8}>
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
