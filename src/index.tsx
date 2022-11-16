import React from 'react';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import {HashRouter} from "react-router-dom";
import {createRoot} from 'react-dom/client';


const theme = createTheme(
    {
        palette: {
            // primary: blue,
            primary: {
                main: "#3f3f3f",
            },
            secondary: red,
            type: "light",
        },

    })

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    </ThemeProvider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();