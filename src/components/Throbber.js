import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper';

const useStyle = makeStyles(theme => ({
  throbber: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: theme.zIndex.tooltip + 100
  },
  throbberMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: theme.palette.grey[500],
    opacity: 0.8
  },
  progressElement: {
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    padding: '7px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  loadingMsg: {
    flex: 1,
    padding: '0 10px'
  }
}));

export default (({ mode, progress, message }) => {
  const classes = useStyle();
  const { throbber, throbberMask, progressElement, loadingMsg } = classes;

  return <div className={throbber}>
    <div className={throbberMask}></div>
    <Paper className={progressElement}>
      <CircularProgress variant={mode || 'indeterminate'} value={progress} />
      <p className={loadingMsg}>{message || 'Please wait...'}</p>
    </Paper>
  </div>
});