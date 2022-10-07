import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {blue, cyan, red} from "@material-ui/core/colors";
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import {BrowserRouter, HashRouter} from "react-router-dom";

const theme = createTheme(
    {
        palette: {
            // primary: blue,
            primary: {
                main: "#6b6a6a",
            },
            secondary: red,
            type: "light",
        },

    })


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>

    </ThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
