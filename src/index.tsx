import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {blue, cyan, red} from "@material-ui/core/colors";
import {Provider} from "react-redux";
import {store} from "./reducers/store";

const theme = createTheme(
    {
        palette: {
            // primary: blue,a
            primary: {
                main: "#fdsfdsf"
            },
            secondary: red,
            type: "light",

        },
    })


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
