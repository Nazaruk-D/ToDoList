import {TasksStateType} from "../../App";
import {tasksReducer} from "../tasks-reducer";
import {addTodolistAC, TodolistDomainType, todolistsreducer} from "../todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let newTodolist = {
        id: "new", title: "new todolist", filter: "all", addedDate:"", order:0, entityStatus: "idle"
    }

    const action = addTodolistAC({todolist: newTodolist});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsreducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe("new");
    expect(idFromTodolists).toBe;
});
