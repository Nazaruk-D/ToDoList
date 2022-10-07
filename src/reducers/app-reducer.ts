import {AppThunk} from "./store";
import {authAPI, StatusCode} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    initialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
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
}


export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (message: null | string) => ({type: "APP/SET-ERROR", message} as const)
export const setInitializedAppAC = (status: boolean) => ({type: "APP/SET-INITIALIZED", status} as const)

export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setInitializedAppAC(false))
    authAPI.me().then(res => {
        if (res.data.resultCode === StatusCode.OK) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch)
    }).finally(() => {
        dispatch(setInitializedAppAC(true))
    })
}


export type SetAppErrorProps = ReturnType<typeof setAppErrorAC>
export type SetAppStatusProps = ReturnType<typeof setAppStatusAC>
export type SetInitializedAppProps = ReturnType<typeof setInitializedAppAC>
export type AppActionsType =
    SetAppStatusProps
    | SetAppErrorProps
    | SetInitializedAppProps