import { Dispatch } from 'redux'
import {ResponseType} from "../api/todolist-api";
import {setAppErrorAC, setAppStatusAC} from "../reducers/app-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({message: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({message: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC({message: error.message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorProps | SetAppStatusProps>
type ErrorUtilsDispatchType = any