import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import ProtectedRoute from 'domains/auth/components/ProtectedRoute';
import AppHeader from 'components/AppHeader';
import StationOrders from 'domains/dashboard/component/StationOrders';

const useStyle = makeStyles(theme => ({
  root: {
    height: 'calc(100vh)',
    overflow: 'hidden',
    background: `linear-gradient(to left,${theme.palette.primary[400]},${theme.palette.primary[900]} )`,
    display: 'grid',
    gridTemplateRows: '70px 1fr'
  }
}));

function DOSHome() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <AppHeader />
      <StationOrders />
    </div>
  );
}

export default () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/" component={DOSHome} />
      </Switch>
    </Router>
  )
}