export const stateSlice = 'auth';

export const ACTION_TYPES = Object.freeze({
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    SET_AUTH_STATUS: 'AUTH.SET_STATUS'
});

export const AUTH_STATUS = {
    UNKNOWN: 'UNKNOWN',
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
    AUTHENTICATED: 'AUTHENTICATED',
    IN_PROGRESS: 'IN_PROGRESS',
    ERROR: 'ERROR'
}

const initialState = {
    status: AUTH_STATUS.UNKNOWN,
    user: undefined
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS: {
            return {
                status: AUTH_STATUS.AUTHENTICATED,
                user: action.user
            }
        }
        case ACTION_TYPES.LOGOUT_SUCCESS: {
            return {
                status: action.status || AUTH_STATUS.NOT_AUTHENTICATED
            }
        }
        case ACTION_TYPES.SET_AUTH_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        default: {
            return state;
        }
    }
}