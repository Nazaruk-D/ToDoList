import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    type TodolistType = {
        id: string
        title: string
        filter: FilterValuesType
    }

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {
            id: todolistID1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todolistID2,
            title: "What to buy",
            filter: "all"
        }
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: true},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function addTodolist(title:string) {
        const newTodolistID = v1()
        const newTodolist: TodolistType = {
            id: newTodolistID,
            title: title,
            filter: "all"
        }
        setTodolist([...todolist, newTodolist])
        setTasks({...tasks, [newTodolistID]:[]})
    }

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        // let todolistTasks = tasks[todolistId]
        // tasks[todolistId] = [newTask, ...todolistTasks]
        // setTasks({...tasks})
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})

    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter: value} : el))
        console.log(todolistId)
    }

    function removeTodolist(id: string) {
        setTodolist(todolist.filter(tl=> tl.id != id))
        delete tasks[id];
        setTasks({...tasks})
    }
    return (
        <div className="App">

            <AddItemForm addItem={addTodolist}/>

            {todolist.map(tl => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                }

                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    id={tl.id}
                />
            })}
        </div>
    );
}

export default App;
