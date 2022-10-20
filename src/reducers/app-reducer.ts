import {AppThunk} from "./store";
import {authAPI, StatusCode} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    initialized: false
}


const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{message: null | string}>) {
            state.error = action.payload.message
        },
        setInitializedAppAC(state, action: PayloadAction<{value: boolean}>) {
            state.initialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer;


/*(state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.message}
        case 'APP/SET-INITIALIZED':
            return {...state, initialized: action.status}
        default:
            return state
    }
}*/

//
// export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
// export const setAppErrorAC = (message: null | string) => ({type: "APP/SET-ERROR", message} as const)
// export const setInitializedAppAC = (status: boolean) => ({type: "APP/SET-INITIALIZED", status} as const)

export const {setInitializedAppAC, setAppStatusAC, setAppErrorAC} = slice.actions;

export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setInitializedAppAC({value: false}))
    authAPI.me().then(res => {
        if (res.data.resultCode === StatusCode.OK) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch)
    }).finally(() => {
        dispatch(setInitializedAppAC({value: true}))
    })
}


// export type SetAppErrorProps = ReturnType<typeof setAppErrorAC>
// export type SetAppStatusProps = ReturnType<typeof setAppStatusAC>
// export type SetInitializedAppProps = ReturnType<typeof setInitializedAppAC>
// export type AppActionsType =
//     SetAppStatusProps
//     | SetAppErrorProps
//     | SetInitializedAppProps