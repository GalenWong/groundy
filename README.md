<div align=center>

# Groundy: CS 130 Fall 2020 Project

_Make YouTube music offline, for free._

</div>

<div align="center">
  <a href="https://facebook.github.io/react/"><img src="./internals/img/react-padded-90.png" /></a>
  <a href="https://webpack.github.io/"><img src="./internals/img/webpack-padded-90.png" /></a>
  <a href="https://redux.js.org/"><img src="./internals/img/redux-padded-90.png" /></a>
  <a href="https://github.com/ReactTraining/react-router"><img src="./internals/img/react-router-padded-90.png" /></a>
  <a href="https://eslint.org/"><img src="./internals/img/eslint-padded-90.png" /></a>
  <a href="https://facebook.github.io/jest/"><img src="./internals/img/jest-padded-90.png" /></a>
  <a href="https://yarnpkg.com/"><img src="./internals/img/yarn-padded-90.png" /></a>
</div>

[![Build Status][github-actions-status]][github-actions-url]

## Motivation

<br>

Music is a crucial part of people’s lives. With the maturity of technology, everyone can play music from their laptop or mobile phone. However, a lot of music streaming platforms require internet access. It often costs money to download music so they can be accessible offline. There are still physical limitations when it comes to internet access. For instance, laptops do not have WiFi on airplanes. Internet condition also fluctuates resulting in limited bandwidth. All these disturbances hinder the listening experience. There exists a need for a consistent, free, and offline music experience.
<br >
Groundy can fill in this gap for offline desktop music experience. Groundy is a desktop application with a core functionality of downloading songs and playlists from YouTube. A lot of music artists put their music on YouTube for free access. Groundy makes those audio available offline to the user. Groundy also leverages the YouTube recommendation algorithm, by fetching recommendations from YouTube and compiling them into a unique playlist just for the user. As the user’s listening habit changes, that playlist changes as well!

### Features

![Can find and download specific songs](./internals/img/groundy-findsong.png)
<br>
This page allows users to input a url to a YouTube video and will display the corresponding information. Users can then choose to preview the video, download the video, or find related songs.
<br>
<br >

![Can find and download playlists](./internals/img/groundy-findplaylist.png)
<br>
This page is similar to the Find Song page, but it handles urls to YouTube playlists rather than songs. It provides the same actions as the Find Song page for each song, but additionally allows users to download the entire playlist at once.
<br>
<br >

![Can find and download playlists](./internals/img/groundy-findplaylist.png)
<br>
This page is similar to the Find Song page, but it handles urls to YouTube playlists rather than songs. It provides the same actions as the Find Song page for each song, but additionally allows users to download the entire playlist at once.
<br>
<br >

![Can see recommended songs](./internals/img/groundy-recommended.png)
<br>
This page requires the user to be logged in and displays all the songs recommended for the user by YouTube. The user can download songs individually or download all songs at once.
<br>
<br >

![Can see all created playlists](./internals/img/groundy-playlists.png)
<br>
This page allows users to create, rename, play, and delete playlists. Clicking on the playlist leads to another page that displays all songs in the playlist.
<br>
<br >

![Can see all downloaded songs](./internals/img/groundy-downloaded.png)
<br>
The Downloaded page displays all the songs downloaded or downloading. The actions available to each song are as follows: Play song, Add to queue, Add to playlist, Delete song, and Find Related.
<br>
<br>

## Directory Structure of Groundy

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

- authentication: a module that handles authentication procedures and storing tokens
- database: contains database APIs for songs, playlists and tokens
- downloader: to download songs & track progress
- ipc & ipc-renderder: for backend-to-frontend and frontend-to-backend communication
- youtubeData: to get recommendations from YouTube and fetch meta data for videos and playlists
- playlist: contain APIs for playlist module to manage the local playlists
- SongStore: contains APIs for interacting with the file system to store songs

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

## API Documentations Generation
We are using typedoc and you can configure it in tsconfig.json.
```bash
yarn typedoc
```

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
