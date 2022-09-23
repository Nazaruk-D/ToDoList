import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC, ChangeTodolistFilterAT,
    changeTodolistTitleAC, ChangeTodolistTitleAT,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todolistsreducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>


beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:"", order:0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:"", order:0}
    ]
})


test('correct todolist should be removed', () => {
    // 1. Тестовые данные:

    // 2. Вызов тестируемой функции:
    const endState = todolistsreducer(startState, removeTodolistAC(todolistId2))
    // 3. Сверка результата c ожиданием:
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});


test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsreducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);

});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action: ChangeTodolistFilterAT = {
        type: "CHANGE-TODOLIST-FILTER",
        filter: newFilter,
        id: todolistId2
    }

    const endState = todolistsreducer(startState, changeTodolistFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action: ChangeTodolistTitleAT = {
        type: "CHANGE-TODOLIST-TITLE",
        title: newTodolistTitle,
        id: todolistId2
    };

    const endState = todolistsreducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
