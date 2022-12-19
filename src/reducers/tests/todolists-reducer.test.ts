import {v1} from "uuid";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    FilterValuesType,
    TodolistDomainType,
    todolistsreducer
} from "../todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>


beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:"", order:0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:"", order:0, entityStatus: "idle"}
    ]
})


test('correct todolist should be removed', () => {
    const endState = todolistsreducer(startState, deleteTodolistTC.fulfilled({id: todolistId2}, "requestId", todolistId2))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});


test('correct todolist should be added', () => {
    let newTodolistTitle = "Hey"
    let newTodolist = {
        id: todolistId1, title: newTodolistTitle, filter: "all", addedDate:"", order:0, entityStatus: "idle"
    }

    const endState = todolistsreducer(startState, addTodolistTC.fulfilled({todolist: newTodolist}, "requestId", newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);

});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";
    const endState = todolistsreducer(startState, changeTodolistFilterAC({filter: newFilter, id: todolistId2}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";
    const payload = {title: newTodolistTitle,id: todolistId2}
    const endState = todolistsreducer(startState, changeTodolistTitleTC.fulfilled(payload, "requestId", payload));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
