import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { logoutAction } from 'domains/auth/actions';
import { loggedInUserSelector } from 'domains/auth';

const useStyle = makeStyles(theme => ({
    root: {
        padding: 20,
        display: 'grid',
        gridTemplateColumns: '1fr auto auto',
        gridGap: 10,
        alignItems: 'center',
        color: theme.palette.getContrastText(theme.palette.primary[500]),
        background: `linear-gradient(to left,${theme.palette.primary[400]},${theme.palette.primary[900]} )`,
    }
}));

export default () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(loggedInUserSelector);

    return (<header className={classes.root}>
        <Typography variant="h5" color="inherit">Station Dashboard</Typography>
        <Button size="large" startIcon={<PersonOutlineIcon />}
            color="inherit">
            {loggedInUser.name}
        </Button>
        <Button size="large" endIcon={<LogoutIcon />}
            color="inherit"
            onClick={() => dispatch(logoutAction())}>
            Logout
            </Button>
    </header>)
}