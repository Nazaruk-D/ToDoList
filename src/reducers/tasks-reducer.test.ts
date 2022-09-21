import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TaskPriority, TaskStatus} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(()=>{
    startState = {
        "todolistId1": [
           {id: "1", title: "CSS", status: TaskStatus.New, todoListId: "todolistId1", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
           {id: "2", title: "JS", status: TaskStatus.Completed, todoListId: "todolistId1", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
           {id: "3", title: "React", status: TaskStatus.New, todoListId: "todolistId1", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatus.New, todoListId: "todolistId2", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
            {id: "2", title: "milk", status: TaskStatus.Completed, todoListId: "todolistId2", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
            {id: "3", title: "tea", status: TaskStatus.New, todoListId: "todolistId2", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatus.New, todoListId: "todolistId1", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
            {id: "2", title: "JS", status: TaskStatus.Completed, todoListId: "todolistId1", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
            {id: "3", title: "React", status: TaskStatus.New, todoListId: "todolistId1", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatus.New, todoListId: "todolistId2", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
            {id: "3", title: "tea", status: TaskStatus.New, todoListId: "todolistId2", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatus.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatus.New);
});

test('status of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", "Coca", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Coca");
    expect(endState["todolistId1"][1].title).toBe("JS");
});



test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
    expect(endState["todolistId2"]).toBeUndefined();
});






