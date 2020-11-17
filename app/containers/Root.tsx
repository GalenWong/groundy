import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../store';
import Routes from '../Routes';
import PlayerWrapper from './PlayerWrapper';
import Layout from './Layout';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <PlayerWrapper>
          <Routes />
        </PlayerWrapper>
      </Layout>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
