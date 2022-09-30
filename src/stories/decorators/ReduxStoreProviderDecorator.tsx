import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../../reducers/tasks-reducer";
import {todolistsreducer} from "../../reducers/todolists-reducer";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "../../api/todolist-api";
import {appReducer} from "../../reducers/app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsreducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate:"", order:0, entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate:"", order:0, entityStatus: "idle"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "CSS", status: TaskStatus.Completed, todoListId: "todolistId1", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
            {id: v1(), title: "HTML", status: TaskStatus.New, todoListId: "todolistId1", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
            //
            // {id: v1(), title: "HTML&CSS", isDone: true},
            // {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatus.Completed, todoListId: "todolistId2", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
            {id: v1(), title: "Bread", status: TaskStatus.New, todoListId: "todolistId2", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
        ]
    },
    app: {
        status: 'loading',
        error: null

    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};

export default ReduxStoreProviderDecorator;