import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import 'fontsource-roboto/latin-300.css';
import 'fontsource-roboto/latin-400.css';
import 'fontsource-roboto/latin-500.css';
import 'fontsource-roboto/latin-700.css';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { indigo as primaryColor } from '@material-ui/core/colors';
import App from './App';
import reducers from 'store/rootReducer';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    primary: primaryColor
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'none',
        fontWeight: 400
      }
    },
  }
});
const globalStyles = {
  '@global': {
    html: {
      fontFamily: '"Roboto","Helvetica Neue", "Helvetica", "Arial", sans-serif',
      fontSize: theme.typography.fontSize
    },
    '*,*::before,*::after': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    a: {
      textDecoration: 'none',
      outline: 'none',
      cursor: 'pointer',
      '&.active': {
        display: 'block',
        background: theme.palette.primary[100]
      }
    }
  }
};

const middlewares = [thunk];
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

const AppRoot = withStyles(globalStyles)(
  () => (<Provider store={store}>
    <MuiThemeProvider theme={theme} >
      <App />
    </ MuiThemeProvider>
  </Provider>)
)

ReactDOM.render(
  <React.StrictMode>
    <AppRoot />
  </ React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
