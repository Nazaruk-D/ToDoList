import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, deleteTodolistTC,
    fetchTodolistsThunk,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
} from "./reducers/todolists-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC, UpdateTaskType} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./reducers/store";
import {TaskStatus, TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const dispatch = useAppDispatch()

    useEffect( () => {
      dispatch(fetchTodolistsThunk())
    }, [])

    //tasks:
    const removeTask = useCallback((id: string, todolistId: string) => {
        let action = deleteTaskTC(todolistId, id)
        dispatch(action)
    },[dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    },[dispatch])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
    }, [dispatch])
    const  changeStatus = useCallback((id: string, status: TaskStatus, todolistId: string) => {
        dispatch(updateTaskTC(id, {status}, todolistId))
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

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Logout</Button>
                </Toolbar>

            </AppBar>
            <Container maxWidth={"lg"} >

                <Grid container style={{padding: "20px 0"}} >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(tl => {

                            return (
                                <Grid item key={tl.id} xs={3} style={{height:"100%"}}>
                                    <Paper style={{padding: "20px"}} elevation={8} >
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
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
