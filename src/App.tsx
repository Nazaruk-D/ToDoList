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
            <AppBar position="static" style={{height:"7vh", borderBottom:"1px solid #333333"}}>
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
