import React, {useState} from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../reducers/store";
import {logoutTC} from "../../features/Login/auth-reducer";
import {RequestStatusType} from "../../reducers/app-reducer";
import s from './HeaderApp.module.css'

const HeaderApp = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(store => store.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(store => store.app.status)

    const [menu, setMenu] = useState(false)

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position="static" style={{height: "7vh", borderBottom: "1px solid #333333", position: "fixed"}}>
            <Toolbar style={{minHeight: "7vh", justifyContent: "space-between"}}>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenu(!menu)}
                            className={s.burgerMenuBlock}>
                    <Menu/>
                </IconButton>
                {menu &&
                    <div className={s.burgerMenu}>
                        <a href="https://nazaruk-d.github.io/Portfolio/#" className={s.row}>Portfolio</a>
                        <a href="https://nazaruk-d.github.io/Social-network/#" className={s.row}>Social Network</a>
                        <a href="https://nazaruk-d.github.io/EducationCards/" className={s.row}>Education Cards</a>
                    </div>}
                <Typography variant="h6">
                    Todolists
                </Typography>
                {isLoggedIn && <Button color="inherit" variant={"outlined"} onClick={onClickHandler}>Logout</Button>}
            </Toolbar>
            {
                status === "loading" && <LinearProgress color="secondary"/>
            }
        </AppBar>
    );
};

export default HeaderApp;