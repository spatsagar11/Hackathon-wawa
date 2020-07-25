import { ACTION_TYPES, AUTH_STATUS } from './reducer'
import Server, { RESOURCE_URI } from 'server'

export function checkSessionAction() {
    return async (dispatch) => {
        const response = await Server.get(RESOURCE_URI.session);
        if (response.ok) {
            dispatch({ type: ACTION_TYPES.LOGIN_SUCCESS, user: response.payload });
        } else {
            dispatch({ type: ACTION_TYPES.LOGOUT_SUCCESS })
        }
    }
}

export function loginAction(data) {
    return async (dispatch) => {
        dispatch({ type: ACTION_TYPES.SET_AUTH_STATUS, status: AUTH_STATUS.IN_PROGRESS });
        const response = await Server.get(RESOURCE_URI.login, data);
        if (response.ok) {
            dispatch({ type: ACTION_TYPES.LOGIN_SUCCESS, user: response.payload });
        } else {
            dispatch({ type: ACTION_TYPES.LOGOUT_SUCCESS, status: AUTH_STATUS.ERROR })
        }
    }
}

export function logoutAction() {
    return async (dispatch) => {
        dispatch({ type: ACTION_TYPES.SET_AUTH_STATUS, status: AUTH_STATUS.IN_PROGRESS });
        const response = await Server.delete(RESOURCE_URI.session);
        if (response.ok) {
            dispatch({ type: ACTION_TYPES.LOGOUT_SUCCESS });
            dispatch(checkSessionAction());
        } else {
            dispatch({ type: ACTION_TYPES.SET_AUTH_STATUS, status: AUTH_STATUS.ERROR })
        }
    }
}