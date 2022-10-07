import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./reducers/store";
import {TaskType} from "./api/todolist-api";
import {initializeAppTC, RequestStatusType} from "./reducers/app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {logoutTC} from "./features/Login/auth-reducer";
import {Vanta} from "./components/Vanta";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>( store => store.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>( store => store.app.initialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>( store => store.auth.isLoggedIn)

    useEffect( () => {
      dispatch(initializeAppTC())
    }, [])

    //
    // //tasks:
    // const removeTask = useCallback((id: string, todolistId: string) => {
    //     let action = deleteTaskTC(todolistId, id)
    //     dispatch(action)
    // },[dispatch])
    // const addTask = useCallback((title: string, todolistId: string) => {
    //     dispatch(addTaskTC(todolistId, title))
    // },[dispatch])
    // const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
    //     dispatch(updateTaskTC(todolistId, {title: newTitle}, id))
    // }, [dispatch])
    // const  changeStatus = useCallback((id: string, status: TaskStatus, todolistId: string) => {
    //     dispatch(updateTaskTC(todolistId, {status},  id))
    // }, [dispatch])
    //
    // //todolist:
    // const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    //     dispatch(changeTodolistFilterAC(value, todolistId))
    // }, [dispatch])
    // const removeTodolist = useCallback((id: string) => {
    //     let action = deleteTodolistTC(id);
    //     dispatch(action)
    // }, [dispatch])
    // function changeTodolistTitle(id: string, title: string) {
    //     dispatch(changeTodolistTitleTC(title, id))
    // }
    // const addTodolist = useCallback((title: string) => {
    //     let action = addTodolistTC(title)
    //     dispatch(action)
    // }, [dispatch])

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static" style={{height:"7vh"}}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    {isLoggedIn &&  <Button color="inherit" variant={"outlined"} onClick={onClickHandler}>Logout</Button>}
                </Toolbar>
                {status === "loading" &&  <LinearProgress color="secondary" />}
            </AppBar>
            <Vanta/>
        </div>
    );
}

export default App;
