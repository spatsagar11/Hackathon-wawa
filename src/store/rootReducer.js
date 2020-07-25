import { combineReducers } from 'redux';
import authReducer, { stateSlice } from 'domains/auth/reducer';
import ordersReducer, { ordersStateSlice } from 'domains/dashboard/reducer';

export default combineReducers({
    [stateSlice]: authReducer,
    [ordersStateSlice]: ordersReducer
})