
export const ordersStateSlice = 'orders';

export const ACTION_TYPES = Object.freeze({
    SET_ORDERS: 'SET_ORDERS',
    SET_ORDERS_LOADING: 'SET_ORDERS_LOADING'
});

export const PAGE_STATUS = {
    UNKNOWN: 'UNKNOWN',
    IN_PROGRESS: 'IN_PROGRESS',
    ORDERS_LOADED: 'ORDERS_LOADED'
}

const initialState = {
    status: PAGE_STATUS.UNKNOWN,
    data: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_ORDERS: {
            return {
                status: PAGE_STATUS.ORDERS_LOADED,
                data: action.orders
            }
        }
        case ACTION_TYPES.SET_ORDERS_LOADING: {
            return {
                ...state,
                status: PAGE_STATUS.IN_PROGRESS
            }
        }
        default: {
            return state;
        }
    }
}