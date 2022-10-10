import { Dispatch } from 'redux'
import {SetAppErrorProps, setAppStatusAC, SetAppStatusProps} from "../../reducers/app-reducer";
import {AppThunk} from "../../reducers/store";
import {authAPI, LoginParamsType, StatusCode} from "../../api/todolist-api";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodosDataAC} from "../../reducers/todolists-reducer";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if(res.data.resultCode === StatusCode.OK){
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((err:AxiosError)=>{
            handleServerNetworkError(err, dispatch)
    })
        .finally(()=> {
            dispatch(setAppStatusAC('idle'))
        })
}


export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === StatusCode.OK) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(clearTodosDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



// types
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppErrorProps | SetAppStatusProps