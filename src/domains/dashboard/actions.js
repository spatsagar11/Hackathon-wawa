import { ACTION_TYPES, ordersStateSlice } from './reducer'
import Server, { RESOURCE_URI } from 'server'


export function loadOrders() {
    return async (dispatch) => {
        dispatch({ type: ACTION_TYPES.SET_ORDERS_LOADING });
        const response = await Server.get(RESOURCE_URI.orders);
        if (response.ok) {
            const orders = response.payload.map(order => ({ ...order, status: 'pending' }))
            dispatch({ type: ACTION_TYPES.SET_ORDERS, orders });
        } else {
            dispatch({ type: ACTION_TYPES.SET_ORDERS, orders: [] });
        }
    }
}

export function orderPreparedAction(orderNo, itemID) {
    return async (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.SET_ORDERS_LOADING });
        const state = getState();
        const orders = state[ordersStateSlice].data;
        const updatedOrders = orders.map(order => {
            if (order.orderNo === orderNo && order.itemID === itemID) {
                return { ...order, status: 'done' }
            }
            return order;
        });
        dispatch({ type: ACTION_TYPES.SET_ORDERS, orders: updatedOrders });
    }
}

export const ordersSelector = (state) => state[ordersStateSlice];