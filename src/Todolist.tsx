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

    const onCLickButtonHandler = () => props.callBack()


    const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setTitleInput(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.callBack()
        }
    }

    const tsarChangeFilter = (value:FilterValuesType) => {props.changeFilter(value)}

    const onClickHandler = (tID:string) => props.removeTask(tID)

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
                    // const onClickHandler = () => props.removeTask(t.id)
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>onClickHandler(t.id)}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={()=>tsarChangeFilter("all")}>All</button>
            <button onClick={()=>tsarChangeFilter("active")}>Active</button>
            <button onClick={()=>tsarChangeFilter("completed")}>Completed</button>
        </div>
    </div>
}
