import {Dispatch} from 'redux'
import {setAppStatusAC} from "../../reducers/app-reducer";
import {AppThunk} from "../../reducers/store";
import {authAPI, LoginParamsType, StatusCode} from "../../api/todolist-api";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodosDataAC} from "../../reducers/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})


export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === StatusCode.OK) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch)
    })
        .finally(() => {
            dispatch(setAppStatusAC({status: 'idle'}))
        })
}


export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === StatusCode.OK) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
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
// export type LoginActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppErrorProps | SetAppStatusProps