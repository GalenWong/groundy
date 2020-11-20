import { ipcMain } from 'electron';
import addSongToPlaylist from './addSongToPlaylist';
import deletePlaylist from './deletePlaylist';
import deleteSong from './deleteSong';
import getAllDownloads from './getAllDownloads';
import getAllPlaylists from './getAllPlaylists';
import getPlaylistInfo from './getPlaylistInfo';
import getRecommendation from './getRecommendation';
import getSongPath from './getSongPath';
import getYouTubePlaylist from './getYouTubePlaylist';
import getYouTubeSong from './getYouTubeSong';
import isLoggedIn from './isLoggedIn';
import newPlaylist from './newPlaylist';
import removeSongFromPlaylist from './removeSongFromPlaylist';
import startAuth from './startAuth';
import startDownload from './startDownload';

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
};

const ipcEndpointWrapper = <T extends CallableFunction>(func: T) => (
  _e: Event,
  ...args: unknown[]
) => func(...args);

const registerEndpoints = () => {
  Object.entries(endPoints2Handler).forEach(([endpoint, handler]) => {
    ipcMain.handle(endpoint, ipcEndpointWrapper(handler));
  });
};

export default registerEndpoints;
