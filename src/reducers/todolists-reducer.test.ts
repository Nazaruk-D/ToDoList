import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterAT, ChangeTodolistTitleAC,
    ChangeTodolistTitleAT,
    ReamoveTodolistAC,
    todolistsreducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    // 1. Тестовые данные:
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    // 2. Вызов тестируемой функции:
    const endState = todolistsreducer(startState, ReamoveTodolistAC(todolistId2))
    // 3. Сверка результата c ожиданием:
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsreducer(startState, AddTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);

});


test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ChangeTodolistFilterAT = {
        type: "CHANGE-TODOLIST-FILTER",
        filter: newFilter,
        id: todolistId2
    }

    const endState = todolistsreducer(startState, ChangeTodolistFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ChangeTodolistTitleAT = {
        type: "CHANGE-TODOLIST-TITLE",
        title: newTodolistTitle,
        id: todolistId2
    };

    const endState = todolistsreducer(startState, ChangeTodolistTitleAC(newTodolistTitle, todolistId2));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
