import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { SnackbarProvider } from 'notistack';
import { Store } from '../store';
import Routes from '../Routes';
import PlayerWrapper from './PlayerWrapper';
import Layout from './Layout';
import ErrorSnackBarWrapper from './ErrorSnackbarWrapper';

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
          <Layout>
            <PlayerWrapper>
              <Routes />
            </PlayerWrapper>
          </Layout>
        </ErrorSnackBarWrapper>
      </SnackbarProvider>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
