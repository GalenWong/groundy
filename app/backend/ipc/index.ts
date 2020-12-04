import { ipcMain } from 'electron';
import { notifyError } from '../ipc-renderer';
import addSongToPlaylist from './addSongToPlaylist';
import deletePlaylist from './deletePlaylist';
import deleteSong from './deleteSong';
import downloadPlaylist from './downloadPlaylist';
import getAllDownloads from './getAllDownloads';
import getAllPlaylists from './getAllPlaylists';
import getPlaylistInfo from './getPlaylistInfo';
import getRecommendation from './getRecommendation';
import getRelated from './getRelated';
import getSongPath from './getSongPath';
import getSongState from './getSongState';
import getYouTubePlaylist from './getYouTubePlaylist';
import getYouTubeSong from './getYouTubeSong';
import isLoggedIn from './isLoggedIn';
import logout from './logout';
import newPlaylist from './newPlaylist';
import removeSongFromPlaylist from './removeSongFromPlaylist';
import renamePlaylist from './renamePlaylist';
import startAuth from './startAuth';
import startDownload from './startDownload';

/**
 * All the endpoint functions
 */
export enum BackendEndpoints {
  IS_LOGGED_IN = 'is-user-logged-in',
  GET_ALL_DOWNLOADS = 'get-all-downloads',
  GET_RECOMMENDATION = 'get-recommendation',
  GET_YOUTUBE_PLAYLIST = 'get-youtube-playlist',
  GET_YOUTUBE_SONG = 'get-youtube-song',
  GET_ALL_PLAYLISTs = 'get-all-playlists',
  GET_PLAYLIST_INFO = 'get-playlist-info',
  DELETE_PLAYLIST = 'delete-playlist',
  ADD_SONG_TO_PLAYLIST = 'add-song-to-playlist',
  REMOVE_SONG_FROM_PLAYLIST = 'remove-song-from-playlist',
  NEW_PLAYLIST = 'new-playlist',
  START_DOWNLOAD = 'start-download',
  DELETE_SONG = 'delete-song',
  GET_SONG_PATH = 'get-song-path',
  START_AUTH = 'start-auth',
  LOG_OUT = 'log-out',
  GET_RELATED = 'get-related',
  DOWNLOAD_PLAYLIST = 'download-playlist',
  GET_SONG_STATE = 'get-song-state',
  RENAME_PLAYLIST = 'rename-playlist',
}

const endPoints2Handler = {
  [BackendEndpoints.IS_LOGGED_IN]: isLoggedIn,
  [BackendEndpoints.GET_ALL_DOWNLOADS]: getAllDownloads,
  [BackendEndpoints.GET_RECOMMENDATION]: getRecommendation,
  [BackendEndpoints.GET_YOUTUBE_PLAYLIST]: getYouTubePlaylist,
  [BackendEndpoints.GET_YOUTUBE_SONG]: getYouTubeSong,
  [BackendEndpoints.GET_ALL_PLAYLISTs]: getAllPlaylists,
  [BackendEndpoints.GET_PLAYLIST_INFO]: getPlaylistInfo,
  [BackendEndpoints.DELETE_PLAYLIST]: deletePlaylist,
  [BackendEndpoints.ADD_SONG_TO_PLAYLIST]: addSongToPlaylist,
  [BackendEndpoints.REMOVE_SONG_FROM_PLAYLIST]: removeSongFromPlaylist,
  [BackendEndpoints.NEW_PLAYLIST]: newPlaylist,
  [BackendEndpoints.START_DOWNLOAD]: startDownload,
  [BackendEndpoints.DELETE_SONG]: deleteSong,
  [BackendEndpoints.GET_SONG_PATH]: getSongPath,
  [BackendEndpoints.START_AUTH]: startAuth,
  [BackendEndpoints.LOG_OUT]: logout,
  [BackendEndpoints.GET_RELATED]: getRelated,
  [BackendEndpoints.DOWNLOAD_PLAYLIST]: downloadPlaylist,
  [BackendEndpoints.GET_SONG_STATE]: getSongState,
  [BackendEndpoints.RENAME_PLAYLIST]: renamePlaylist,
};

type AsyncFunc = (...args: any[]) => Promise<unknown> | void;

/**
 * Wrapper for an ipc endpoint
 *
 * @param {AsyncFunc} func - IPC endpoint to be wrapped
 * @returns {func} - a wrapped endpoint
 */
const ipcEndpointWrapper = (func: AsyncFunc) => (
  _e: Event,
  ...args: unknown[]
) => func(...args);

/**
 * Wrapper that provides error handling for an ipc function
 *
 * @param {AsyncFunc} func - IPC function to be wrapped
 * @returns {func} - a wrapped function
 */
const ipcErrorHandler = (func: AsyncFunc) => async (...args: unknown[]) => {
  try {
    const result = await func(...args);
    return result;
  } catch (e) {
    notifyError(e.message);
    throw e;
  }
};

/**
 * A function that register all endpoints for the ipcMain process
 *
 * @returns {void} - void
 */
const registerEndpoints = () => {
  Object.entries(endPoints2Handler).forEach(([endpoint, handler]) => {
    ipcMain.handle(endpoint, ipcEndpointWrapper(ipcErrorHandler(handler)));
  });
};

export default registerEndpoints;
