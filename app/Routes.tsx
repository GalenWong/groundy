/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
// import HomePage from './containers/HomePage';
import DownloadedPage from './containers/DownloadedPage';
import RecommendedPage from './containers/RecommendedPage';
import FindRelatedPage from './containers/FindRelatedPage';
import AllPlaylistsPage from './containers/AllPlaylistsPage';
import SideBar from './components/Sidebar';
// Lazily load routes and code split with webpack
// const LazyCounterPage = React.lazy(() =>
//   import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
// );

// const CounterPage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCounterPage {...props} />
//   </React.Suspense>
// );

export default function Routes() {
  return (
    <App>
      <SideBar />
      <Switch>
        {/* <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={HomePage} /> */}
        <Route path={routes.ALLPLAYLISTS} component={AllPlaylistsPage} />
        <Route path={routes.FINDRELATED} component={FindRelatedPage} />
        <Route path={routes.RECOMMENDED} component={RecommendedPage} />
        <Route path={routes.DOWNLOADED} component={DownloadedPage} />
      </Switch>
    </App>
  );
}
