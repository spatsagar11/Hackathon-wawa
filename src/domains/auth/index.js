import { stateSlice } from './reducer';

export { AUTH_STATUS } from './reducer';
export const authStatusSelector = (state) => state[stateSlice].status;
export const loggedInUserSelector = (state) => state[stateSlice].user || {};