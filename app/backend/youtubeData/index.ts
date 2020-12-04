import { google } from 'googleapis';
import { Token } from '../../types';
import { getOAuthClient } from '../authentication';
import secrets from './apikey.json';

/**
 * Get a Youtube client (in the googleapis) without a token
 *
 * @returns - a youtube client
 */
const getClientNoLogin = () => {
  return google.youtube({
    version: 'v3',
    auth: secrets.API_KEY,
  });
};

/**
 * Get a Youtube client (in the googleapis) with token
 *
 * @param {Token?} token - user token
 * @returns - a youtube client
 */
const getClientWithToken = (token: Token) => {
  const oauth = getOAuthClient()[0];
  oauth.setCredentials(token);

  return google.youtube({
    version: 'v3',
    auth: oauth,
  });
};

/**
 * Get a song
 *
 * @async
 * @param {string} songId - ytid of the song
 * @param {Token?} token - user token
 * @returns - a Song-like object
 */
const getSongById = async (songId: string, token?: Token) => {
  const client = token ? getClientWithToken(token) : getClientNoLogin();
  const result = await client.videos.list({
    part: ['snippet'],
    id: [songId],
  });
  if (result.data.items?.length !== 1) {
    throw new Error(`cannot find video with id ${songId}`);
  }
  const song = result.data.items[0];
  return {
    ytID: song.id as string,
    channel: song.snippet?.channelTitle as string,
    title: song.snippet?.title as string,
  };
};

/**
 * Get related songs of a song
 *
 * @async
 * @param {number = 25} maxResults - max number of returned recommended songs
 * @param {Token?} token - user token
 * @returns - an array of Song-like objects
 */
const getRecommendations = async (token: Token, maxResults = 25) => {
  const client = getClientWithToken(token);
  const results = await client.playlistItems.list({
    part: ['snippet'],
    playlistId: 'RDMM',
    maxResults,
  });
  const songs = results.data.items?.map((v) =>
    getSongById(v.snippet?.resourceId?.videoId as string, token)
  );
  if (songs) return Promise.all(songs);
  throw new Error('cannot fetch recommendation');
};

/**
 * Get a local playlist
 *
 * @async
 * @param {string} playlistId - id of the playlist
 * @param {Token?} token - user token
 * @returns - a Playlist-like object
 */
const getPlaylist = async (playlistId: string, token?: Token) => {
  const client = token ? getClientWithToken(token) : getClientNoLogin();
  const playlistResp = await client.playlists.list({
    part: ['snippet'],
    id: [playlistId],
  });
  if (playlistResp.data.items?.length !== 1) {
    throw new Error(`playlist with ID ${playlistId} is not found`);
  }
  const playlistName = playlistResp.data.items[0].snippet?.title;
  const results = await client.playlistItems.list({
    part: ['snippet'],
    playlistId,
    maxResults: 50,
  });
  const songPromises = results.data.items?.map((v) =>
    getSongById(v.snippet?.resourceId?.videoId as string)
  );
  if (songPromises)
    return {
      name: playlistName as string,
      songs: await Promise.all(songPromises),
    };
  throw new Error(`cannot get playlist ${playlistId}`);
};

/**
 * Get related songs of a song
 *
 * @async
 * @param {string} songId - id of the song
 * @param {Token?} token - user token
 * @returns - an array of Song-like objects
 */
const getRelated = async (songId: string, token?: Token) => {
  const client = token ? getClientWithToken(token) : getClientNoLogin();
  const results = await client.search.list({
    part: ['snippet'],
    relatedToVideoId: songId,
    maxResults: 25,
    type: ['video'],
  });
  const songs = results.data.items?.map((v) => ({
    ytID: v.id?.videoId as string,
    channel: v.snippet?.channelTitle as string,
    title: v.snippet?.title as string,
  }));
  if (songs) return songs;
  throw new Error(`cannot get related songs to ${songId}`);
};

export { getSongById, getPlaylist, getRecommendations, getRelated };
