import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {HighlightOff} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type PropsTaskType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void


}

export const Task: FC<PropsTaskType> = React.memo(({task  , removeTask, changeTaskTitle, changeTaskStatus}) => {

    const onClickHandler = useCallback(() => removeTask(task.id),[task.id])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    },[task.id])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue);
    },[task.id])


    return (
        <div>
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox size={"small"}
                          color={"primary"}
                          onChange={onChangeHandler}
                          checked={task.isDone}/>
                {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                    <HighlightOff/>
                </IconButton>
            </li>
        </div>
    );
})
