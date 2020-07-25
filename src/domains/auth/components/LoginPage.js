import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CruTextField from 'components/form/CruTextField';
import { useCKSForm } from 'components/form/cksform';
import { loginAction } from 'domains/auth/actions';
import { authStatusSelector } from 'domains/auth';
import Throbber from 'components/Throbber';
import { AUTH_STATUS } from '../reducer';

const styles = theme => ({
    container: {
        height: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F4F5F7'
    },
    formwrap: {
        width: '670px',
        borderRadius: '5px',
        overflow: 'hidden',
        position: 'relative'
    },
    formtitlearea: {
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: '-1',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            background: `linear-gradient(to left,${theme.palette.primary[400]},${theme.palette.primary[900]} )`,
            opacity: '0.8',
        },
        position: 'relative',
        zIndex: 1,
        background: 'url(/images/logintitle_bg.jpg) no-repeat center',
        backgroundSize: 'cover',
        height: '150px',
        color: theme.palette.getContrastText(theme.palette.primary[500]),
        display: 'grid',
        alignItems: 'center'
    },
    loginform: {
        background: theme.palette.common.white,
        display: 'grid',
        gridColumnGap: theme.spacing(4),
        alignItems: 'baseline',
        gridTemplateColumns: '100px 1fr',
        padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
        minHeight: '300px',
        position: 'relative'
    },
    btnContainer: {
        marginTop: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns: '1fr auto'
    },
    registration: {
        marginTop: theme.spacing(3),
        textAlign: 'center'
    }
});

const useStyles = makeStyles(styles);

export default function LoginPage() {
    const classes = useStyles();
    const dispath = useDispatch();
    const authStatus = useSelector(authStatusSelector);
    const { formData, onChangeField, validate, errors } = useCKSForm({
        username: "",
        password: ""
    });

    const login = (event) => {
        event.preventDefault();
        const isValid = validate(event.currentTarget.form);
        if (isValid) {
            dispath(loginAction(formData));
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.formwrap}>
                {authStatus === AUTH_STATUS.IN_PROGRESS && <Throbber />}
                <div className={classes.formtitlearea}>
                    <Typography variant="h4" color="inherit" align="center">Staff Login</Typography>
                </div>
                <form noValidate autoComplete="off">
                    <div className={classes.loginform}>
                        <div />
                        <Typography variant="subtitle1" color="error" margin="normal">
                            {authStatus === AUTH_STATUS.ERROR && "Unable to login with provided credentials."}
                        </Typography>

                        <Typography variant="subtitle1" align="right">Email Id</Typography>
                        <CruTextField type="email" name="username" label="Enter registered email id" margin="none"
                            required onChange={onChangeField} displayName="Email ID" value={formData.username}
                            error={!!errors.username} helperText={errors.username} />

                        <Typography variant="subtitle1" noWrap align="right" gutterBottom>Password</Typography>
                        <CruTextField type="password" name="password" label="Enter password" margin="none"
                            required onChange={onChangeField} displayName="Password" value={formData.password}
                            error={!!errors.password} helperText={errors.password} />

                        <div />
                        <div className={classes.btnContainer}>
                            <div>
                                <Button variant="contained" color="primary" onClick={login}>Log In</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}