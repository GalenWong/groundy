<img src="internals/img/erb-banner.png" width="100%" />

<br>

<p>
  Groundy
</p>

<br>

Directory Structure of Groundy 

```
/app
    /backend
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
    /reducers 
```

```/backend```: includes authentication to hook up with database, dataAPI, database, downloader to download songs, ipc & ipc-renderder for frontend communication, youtubeData to get recommendations from YouTube and playlist. 

```/components```: includes the following frontend components: AllPlaylists, Downloaded, FindPlaylist, FindRelated, FindSong, Home, LoginButton, MusicPlayer, Recommended, RenameDialog, Setting, ShowPlaylist 

```/containers```: includes ErrorSnackbarWrapper, LoginGuard, LoginStateWrapper, PlayerWrapper, ProgressWrapper 

```/hooks```: backend to frontend communication 

```/types```: includes all user-defined types 

```/test```: includes unit tests & integration tests for backend-to-frontend communication, database, ipc, downloader, and songstore. 


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
yarn run test
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

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
