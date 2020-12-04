<div align=center>

# Groundy: CS 130 Fall 2020 Project

_Make YouTube music offline, for free._

</div>

## Directory Structure of Groundy

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

- authentication: a module that handles authentication procedures and storing tokens
- database: contains database APIs for songs, playlists and tokens
- downloader: to download songs & track progress
- ipc & ipc-renderder: for backend-to-frontend and frontend-to-backend communication
- youtubeData: to get recommendations from YouTube and
- playlist: contain APIs for playlist module
- SongStore: contains APIS for songs

`/components` includes logical React components for the frontend

`/containers` style wrapper React components for the frontend

`/hooks` frontend to backend communication logic in forms of React hooks & reusable frontend logic written in hooks

`/types` includes all application-wide types, which defines the contract between frontend & backend communication

`/test`:

- backend: Unit tests & integration tests for database APIs, downloader, IPC and songStore
- hooks: unit tests for frontend & backend communication: receiving single update & using duplicate updates to override previous entry
- mocks: using jest to mock ipcRenderer

## Install

- **If you have installation or compilation issues with this project, please see [electron's debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git and install dependencies:

```bash
git clone https://github.com/GalenWong/groundy
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

To run specific tests, replace `test` with the path to the specific test file(s).

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

To package only for one platform:

```bash
yarn package-linux
yarn package-mac
yarn package-win
```

## Github Actions

Everytime a pull request is made, Github will run it through a series of CI/CD tests so that once the code goes through any building and testing processes, it's in a deployable state. We merge only when code is reviewed and all tests passes.

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
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
