export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.message}
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (message: null | string) => ({type: "APP/SET-ERROR", message} as const)


export type SetAppErrorProps = ReturnType<typeof setAppErrorAC>
export type SetAppStatusProps = ReturnType<typeof setAppStatusAC>
export type AppActionsType =
    SetAppStatusProps
    |  SetAppErrorProps