/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routesJSON from './constants/routes.json';
import App from './containers/App';
// import HomePage from './containers/HomePage';
import DownloadedPage from './containers/DownloadedPage';
import RecommendedPage from './containers/RecommendedPage';
import FindRelatedPage from './containers/FindRelatedPage';
import AllPlaylistsPage from './containers/AllPlaylistsPage';
import SettingPage from './containers/SettingPage';

// Lazily load routes and code split with webpack
// const LazyCounterPage = React.lazy(() =>
//   import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
// );

// const CounterPage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCounterPage {...props} />
//   </React.Suspense>
// );

interface RoutesObject {
  [index: string]: string;
}
const routes: RoutesObject = routesJSON;

export default function Routes() {
  return (
    <App>
      <br />
      <br />
      <br />
      <br />
      <Switch>
        <Route path={routes['All Playlists']} component={AllPlaylistsPage} />
        <Route path={routes['Find Related']} component={FindRelatedPage} />
        <Route path={routes.Recommended} component={RecommendedPage} />
        <Route path={routes.Downloaded} component={DownloadedPage} />
        <Route path={routes.Setting} component={SettingPage} />
      </Switch>
    </App>
  );
}
