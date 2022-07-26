import React, {FC} from 'react';

type PropsTaskType = {
    id: string
    title: string
    isDone: boolean
}

const Task: FC<PropsTaskType> = ({id, title, isDone}) => {
    return (
        <div>

        </div>
    );
};

export default Task;