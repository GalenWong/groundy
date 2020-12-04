/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routesJSON from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import DownloadedPage from './containers/DownloadedPage';
import RecommendedPage from './containers/RecommendedPage';
import FindSongPage from './containers/FindSongPage';
import FindPlaylistPage from './containers/FindPlaylistPage';
import AllPlaylistsPage from './containers/AllPlaylistsPage';
import SettingPage from './containers/SettingPage';
import ShowPlaylistPage from './components/ShowPlaylist';
import FindRelatedPage from './components/FindRelated';

import Layout from './containers/Layout';

interface RoutesObject {
  [index: string]: string;
}
const routes: RoutesObject = routesJSON;

/**
 * Wrapper that handles routing for the app
 * @returns - wrapped pages based on routes
 */
export default function Routes() {
  return (
    <App>
      <Layout>
        <Switch>
          <Route
            path={`${routes['Show Playlist']}/:id`}
            component={ShowPlaylistPage}
          />
          <Route
            path={`${routes['Find Related']}/:id`}
            component={FindRelatedPage}
          />
          <Route path={routes['All Playlists']} component={AllPlaylistsPage} />
          <Route path={routes['Find Song']} component={FindSongPage} />
          <Route path={routes['Find Playlist']} component={FindPlaylistPage} />
          <Route path={routes.Recommended} component={RecommendedPage} />
          <Route path={routes.Downloaded} component={DownloadedPage} />
          <Route path={routes.Setting} component={SettingPage} />
          <Route path={routes.Home} component={HomePage} />
        </Switch>
      </Layout>
    </App>
  );
}
