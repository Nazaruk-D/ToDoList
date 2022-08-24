import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsreducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsreducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    //tasks:
    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId)
        dispatchTasks(action)
    }
    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(title, todolistId))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(changeTaskStatusAC(id,isDone, todolistId))
    }

    //todolist:
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolists(changeTodolistFilterAC(value, todolistId))
    }
    function removeTodolist(id: string) {
        let action = removeTodolistAC(id);
        dispatchToTodolists(action)
        dispatchTasks(action)
    }
    function changeTodolistTitle(id: string, title: string) {
        dispatchToTodolists(changeTodolistTitleAC(title, id))
    }
    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchTasks(action)
    }

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
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone );
                            }

                            return (
                                <Grid item key={tl.id} xs={3} style={{height:"100%"}}>
                                    <Paper style={{padding: "20px"}} elevation={8} >
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
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
