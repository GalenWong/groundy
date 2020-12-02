/* This is where our backend endpoint functions go */

import { ipcRenderer } from 'electron';
import { BackendEndpoints } from '../backend/ipc';
import { Playlist, DownloadedSong, Song } from '../types';

/**
 * Check Google Account Login Status
 *
 * @async
 * @returns {Promise<boolean>}
 */
const isLoggedIn = async (): Promise<boolean> => {
  return ipcRenderer.invoke(BackendEndpoints.IS_LOGGED_IN);
};

/**
 * Start the Auth work
 *
 * @async
 */
const startAuth = async () => {
  await ipcRenderer.invoke(BackendEndpoints.START_AUTH);
};

/**
 * Log out
 *
 * @async
 */
const logout = async () => {
  await ipcRenderer.invoke(BackendEndpoints.LOG_OUT);
};

/**
 * Get all downloaded songs in an array
 *
 * @async
 * @returns {Promise<Song[]>}
 */
const getAllDownloads = async (): Promise<(Song | DownloadedSong)[]> => {
  const songList = await ipcRenderer.invoke(BackendEndpoints.GET_ALL_DOWNLOADS);
  return songList;
};

/**
 * Get an array of songs based on user account
 *
 * @async
 * @returns {Promise<Song[]>}
 */
const getAllRecommendation = async (): Promise<(DownloadedSong | Song)[]> => {
  const recommendationList = await ipcRenderer.invoke(
    BackendEndpoints.GET_RECOMMENDATION
  );
  return recommendationList;
};

/**
 * Get an array of related songs based on a ytid
 *
 * @async
 * @returns {Promise<Song[]>}
 */
const getRelated = async (ytid: string): Promise<(DownloadedSong | Song)[]> => {
  const relatedList = await ipcRenderer.invoke(
    BackendEndpoints.GET_RELATED,
    ytid
  );
  return relatedList;
};

/**
 * Get a public playlist with an ID
 *
 * @async
 * @param {string} playlistID - a public playlist id
 * @returns {Promise<Playlist>} - Promise that resolves to a Playlist
 */
const getYouTubePlaylist = async (playlistID: string): Promise<Playlist> => {
  const publicPlaylist = await ipcRenderer.invoke(
    BackendEndpoints.GET_YOUTUBE_PLAYLIST,
    playlistID
  );
  return publicPlaylist;
};

/**
 * Get a public song with an ID
 *
 * @async
 * @param {string} songID - ID of a public song
 * @returns {Promise<Song>} - Promise that resolves to a Song
 */
const getYouTubeSong = async (
  songID: string
): Promise<Song | DownloadedSong> => {
  const publicSong = await ipcRenderer.invoke(
    BackendEndpoints.GET_YOUTUBE_SONG,
    songID
  );
  return publicSong;
};

/**
 * Get all local playlists
 *
 * @async
 * @returns {Promise<Playlist[]>}
 */
const getAllPlaylists = async (): Promise<Playlist[]> => {
  const allPlaylists = await ipcRenderer.invoke(
    BackendEndpoints.GET_ALL_PLAYLISTs
  );
  return allPlaylists;
};

/**
 * Get info of a playlist
 *
 * @async
 * @param {string} playlistID - the unique ID of a local playlist
 * @returns {Promise<Playlist>} - Promise that resolves to a Playlist
 */
const getPlaylistInfo = async (playlistID: string): Promise<Playlist> => {
  const playlist = await ipcRenderer.invoke(
    BackendEndpoints.GET_PLAYLIST_INFO,
    playlistID
  );
  return playlist;
};

/**
 * Delete a local playlist
 *
 * @async
 * @param {string} playlistID - id of a local playlist
 * @returns {Promise<boolean>} -  - success/failure
 */
const deletePlaylist = async (playlistID: string): Promise<boolean> => {
  try {
    await ipcRenderer.invoke(BackendEndpoints.DELETE_PLAYLIST, playlistID);
  } catch (err) {
    console.error(`Error in deletePlaylist: ${err}`);
    return false;
  }
  return true;
};

/**
 * Add a song to a local playlist
 *
 * @async
 * @param {string} songID - id of a song
 * @param {string} playlistID - id of a local playlist
 * @returns {Promise<boolean>} - success/failure
 */
const addSongToPlaylist = async (
  songID: string,
  playlistID: string
): Promise<boolean> => {
  try {
    await ipcRenderer.invoke(
      BackendEndpoints.ADD_SONG_TO_PLAYLIST,
      songID,
      playlistID
    );
  } catch (err) {
    console.error(`Error in addSongToPlaylist: ${err}`);
    return false;
  }
  return true;
};

/**
 * Remove a song from a local playlist
 *
 * @async
 * @param {string} songID - id of a song
 * @param {string} playlistID - id of a local playlist
 * @returns {Promise<boolean>} - success/failure
 */
const removeSongFromPlaylist = async (
  songID: string,
  playlistID: string
): Promise<boolean> => {
  try {
    await ipcRenderer.invoke(
      BackendEndpoints.REMOVE_SONG_FROM_PLAYLIST,
      songID,
      playlistID
    );
  } catch (err) {
    console.error(`Error in removeSongFromPlaylist: ${err}`);
    return false;
  }
  return true;
};

/**
 * Create a new local playlist
 *
 * @async
 * @param {string} name - name of the new playlist
 * @returns {Promise<string>} - local playlist id
 */
const newPlaylist = async (name: string): Promise<string> => {
  const newListID = await ipcRenderer.invoke(
    BackendEndpoints.NEW_PLAYLIST,
    name
  );
  return newListID;
};

/**
 * Start downloading a song
 *
 * @async
 * @param {string} ytID - id of a song
 * @returns {Promise<boolean>} - success/failure
 */
const startDownload = async (ytID: string): Promise<boolean> => {
  try {
    await ipcRenderer.invoke(BackendEndpoints.START_DOWNLOAD, ytID);
  } catch (err) {
    console.error(`Error in startDownload: ${err}`);
    return false;
  }
  return true;
};

/**
 * Delete a local song
 *
 * @async
 * @param {string} ytID - id of a song
 * @returns {Promise<boolean>} - success/failure
 */
const deleteSong = async (ytID: string): Promise<boolean> => {
  try {
    await ipcRenderer.invoke(BackendEndpoints.DELETE_SONG, ytID);
  } catch (err) {
    console.error(`Error in deleteSong: ${err}`);
    return false;
  }
  return true;
};

/**
 * Get the path to a local song file
 *
 * @async
 * @param {string} ytID - id of a song
 * @returns {Promise<string>} - path string
 */
const getSongPath = async (ytID: string): Promise<string> => {
  const songPath = await ipcRenderer.invoke(
    BackendEndpoints.GET_SONG_PATH,
    ytID
  );
  return songPath;
};

/**
 * See if a song is downloaded
 *
 * @param {Song | DownloadedSong} thing - a song
 * @returns {Promise<boolean>} - it's a song or not
 */
const isDownloaded = (
  thing: Song | DownloadedSong
): thing is DownloadedSong => {
  if ((thing as DownloadedSong).filePath && thing.downloaded) {
    return true;
  }
  return false;
};

const getSongState = async (
  ytid: string
): Promise<Song | DownloadedSong | null> => {
  return ipcRenderer.invoke(BackendEndpoints.GET_SONG_STATE, ytid);
};

const renamePlaylist = async (playlistId: string, name: string) => {
  await ipcRenderer.invoke(BackendEndpoints.RENAME_PLAYLIST, playlistId, name);
};

const downloadPlaylist = async (playlist: Playlist) => {
  await ipcRenderer.invoke(BackendEndpoints.DOWNLOAD_PLAYLIST, playlist);
};

export {
  isLoggedIn,
  startAuth,
  logout,
  getAllDownloads,
  getAllRecommendation,
  getRelated,
  getYouTubePlaylist,
  getYouTubeSong,
  getAllPlaylists,
  getPlaylistInfo,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  newPlaylist,
  startDownload,
  deleteSong,
  getSongPath,
  isDownloaded,
  getSongState,
  renamePlaylist,
  downloadPlaylist,
};
