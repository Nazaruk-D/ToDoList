import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";
import App from "../App";
import {Provider} from "react-redux";
import {store} from "../reducers/store";
import ReduxStoreProviderDecorator from "./decorators/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/App',
  component: App,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) =><App/>;

export const AppStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args



