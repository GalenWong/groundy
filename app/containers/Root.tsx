import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../store';
import Routes from '../Routes';
import MusicPlayer from '../components/MusicPlayer';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
    <MusicPlayer
      songQueue={[
        {
          title: 'Deca Joins-Go Slow',
          channel: 'deca joins',
          ytID: 'hC8CH0Z3L54',
          downloaded: true,
          filePath: '/Users/galenw/Desktop/Songs/Deca Joins-Go Slow.mp3',
        },
      ]}
    />
  </Provider>
);

export default hot(Root);
