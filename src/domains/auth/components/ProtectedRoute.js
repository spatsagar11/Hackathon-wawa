import React from 'react';
import {
    Route
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_STATUS, authStatusSelector } from 'domains/auth';
import { checkSessionAction } from 'domains/auth/actions';
import Throbber from 'components/Throbber';
import LoginPage from 'domains/auth/components/LoginPage';

const CheckSession = () => {
    const dispatch = useDispatch();
    dispatch(checkSessionAction());
    return <Throbber message="Checking Session..." />;
}
export default ({ component, ...props }) => {
    const authStatus = useSelector(authStatusSelector);


    switch (authStatus) {
        case AUTH_STATUS.AUTHENTICATED: {
            return <Route {...props} component={component} />;
        }
        case AUTH_STATUS.UNKNOWN: {
            return <Route {...props} component={CheckSession} />;
        }
        default: {
            return <Route {...props} component={LoginPage} />;
        }
    }
}