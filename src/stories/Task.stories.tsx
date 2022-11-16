import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../features/TodoLists/Todolist/Task/Task";
import {TaskPriority, TaskStatus} from "../api/todolist-api";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
    title: 'TODOLIST/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //   onClick: {
    //     addItem: "Callback"
    //   }
    // },
    args: {
        removeTask: action("Remove Task"),
        changeTaskStatus: action("change status"),
        changeTaskTitle: action("change title"),
        task: {id: "qwer", title: "JS", status: TaskStatus.Completed},
    }
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {

};

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {

  task:{id: "qwer", title: "HTML", status: TaskStatus.New, todoListId: "todolistId1", startDate:"", deadline:"", addedDate:"", order:0, priority: TaskPriority.Low, description:""},
};


