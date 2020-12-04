<img src="internals/img/erb-banner.png" width="100%" />

<br>

<p>
  Groundy
</p>

<br>

<div align="center">
  <a href="https://facebook.github.io/react/"><img src="./internals/img/react-padded-90.png" /></a>
  <a href="https://webpack.github.io/"><img src="./internals/img/webpack-padded-90.png" /></a>
  <a href="https://redux.js.org/"><img src="./internals/img/redux-padded-90.png" /></a>
  <a href="https://github.com/ReactTraining/react-router"><img src="./internals/img/react-router-padded-90.png" /></a>
  <a href="https://eslint.org/"><img src="./internals/img/eslint-padded-90.png" /></a>
  <a href="https://facebook.github.io/jest/"><img src="./internals/img/jest-padded-90.png" /></a>
  <a href="https://yarnpkg.com/"><img src="./internals/img/yarn-padded-90.png" /></a>
</div>

<br>

[![Build Status][github-actions-status]][github-actions-url]

<br>

Directory Structure of Groundy 
```
/app
    /backend
        /authentication 
        /dataAPI 
        /database 
        /downloader
        /ipc 
        /ipc-renderder 
        /playlist 
        /youtubeData 
        /SongStore
	/components
	/constants 
	/containers
	/hooks
	/types 
	/utils 
/test
    /backend 
    /hooks 
    /mocks 
```

`/backend`
- authentication: to hook up with database
- dataAPI: contains sample playlist, related songs, recommendated songs 
- database: contains database APIs for songs, playlists and tokens 
- downloader: to download songs & track progress 
- ipc & ipc-renderder: for backend to frontend communication 
- youtubeData: to get recommendations from YouTube and 
- playlist: contain APIs for playlist module 
- SongStore: contains APIS for songs 

`/components` includes React components for the frontend

`/containers` frontend to backend communication logic in forms of React hooks & reusable frontend logic written in hooks

`/hooks` defines the contract between frontend & backend communication 

`/types` includes all user-defined types 

`/test`:
- backend: Unit tests & integration tests for database APIs, downloader, IPC and songStore 
- hooks: unit tests for frontend & backend communication: receiving single update & using duplicate updates to override previous entry
- mocks: using jest to mock ipcRenderer

## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git and install dependencies:

```bash
git clone --depth 1 --single-branch https://github.com/GalenWong/groundy
cd groundy
yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

## Testing 

```bash 
yarn jest test
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## Github Actions 

Everytime a pull request is made, Github will run it through a series of CI/CD tests so that once the code goes through any building and testing processes, it's in a deployable state. 

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[github-actions-status]: https://github.com/GalenWong/groundy/workflows/Test/badge.svg
[github-actions-url]: https://github.com/GalenWong/groundy/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate
[david-image]: https://img.shields.io/david/electron-react-boilerplate/electron-react-boilerplate.svg
[david-url]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate
[david-dev-image]: https://img.shields.io/david/dev/electron-react-boilerplate/electron-react-boilerplate.svg?label=devDependencies
[david-dev-url]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate?type=dev
[good-first-issue-image]: https://img.shields.io/github/issues/electron-react-boilerplate/electron-react-boilerplate/good%20first%20issue.svg?label=good%20first%20issues
[good-first-issue-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"
