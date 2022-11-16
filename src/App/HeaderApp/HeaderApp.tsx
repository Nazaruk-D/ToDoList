import React from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../reducers/store";
import {logoutTC} from "../../features/Login/auth-reducer";
import {RequestStatusType} from "../../reducers/app-reducer";

const HeaderApp = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>( store => store.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>( store => store.app.status)

    const onClickHandler = () => {
        dispatch(logoutTC())
    }
    return (
            <AppBar position="static" style={{height:"7vh", borderBottom:"1px solid #333333", position:"fixed"}}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    {isLoggedIn && <Button color="inherit" variant={"outlined"} onClick={onClickHandler}>Logout</Button>}
                </Toolbar>
                {status === "loading" &&  <LinearProgress color="secondary" />}
            </AppBar>
    );
};

export default HeaderApp;