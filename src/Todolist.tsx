import React from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    callBack: () => void
    setTitleInput: (titleInput: string) => void
    titleInput: string
}

export function Todolist(props: PropsType) {

    const onCLickButtonHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.callBack()

    }

    const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setTitleInput(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            props.callBack()
        }
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={props.titleInput}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyPressHandler}/>
            <button onClick={onCLickButtonHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
