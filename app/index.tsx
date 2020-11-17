import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { history, configuredStore } from './store';
import './app.global.css';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <ThemeProvider theme={darkTheme}>
        <Root store={store} history={history} />
      </ThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  );
});
