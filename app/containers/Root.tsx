import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { SnackbarProvider } from 'notistack';
import { Store } from '../store';
import Routes from '../Routes';
import ErrorSnackBarWrapper from './ErrorSnackbarWrapper';
import PlayerWrapper from './PlayerWrapper';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <ErrorSnackBarWrapper>
          <PlayerWrapper>
            <Routes />
          </PlayerWrapper>
        </ErrorSnackBarWrapper>
      </SnackbarProvider>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
