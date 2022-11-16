import React, {useEffect} from 'react';
import {CircularProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../reducers/store";
import {TaskType} from "../api/todolist-api";
import {initializeAppTC} from "../reducers/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {BodyApp} from "./BodyApp/BodyApp";
import HeaderApp from "./HeaderApp/HeaderApp";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(store => store.app.initialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <HeaderApp/>
            <BodyApp/>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
