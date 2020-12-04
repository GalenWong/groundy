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
import ProgressWrapper from './ProgressWrapper';
import LoginStateWrapper from './LoginStateWrapper';

type Props = {
  store: Store;
  history: History;
};

/**
 * Wrapper component that handles many wrapping including:
 * routing,
 * error notifications,
 * and music player
 */
const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <ErrorSnackBarWrapper>
          <LoginStateWrapper>
            <ProgressWrapper>
              <PlayerWrapper>
                <Routes />
              </PlayerWrapper>
            </ProgressWrapper>
          </LoginStateWrapper>
        </ErrorSnackBarWrapper>
      </SnackbarProvider>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
