import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {HighlightOff} from "@material-ui/icons";
import {TaskStatus, TaskType} from "./api/todolist-api";

type PropsTaskType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, status: TaskStatus, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    todolistId: string
}

export const Task: FC<PropsTaskType> = React.memo(({task  , removeTask, changeTaskTitle, changeTaskStatus, todolistId}) => {

    const onClickHandler = useCallback(() => removeTask(task.id),[task.id])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatus.Completed : TaskStatus.New, todolistId);
    },[task.id])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue);
    },[task.id])


    return (
        <div>
            <li key={task.id} className={task.status ? "is-done" : ""}>
                <Checkbox size={"small"}
                          color={"primary"}
                          onChange={onChangeHandler}
                          checked={task.status === TaskStatus.Completed}/>
                {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                    <HighlightOff/>
                </IconButton>
            </li>
        </div>
    );
})
