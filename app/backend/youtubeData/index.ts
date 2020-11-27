import { google } from 'googleapis';
import { Token } from '../../types';
import { getOAuthClient } from '../authentication';
import secrets from './apikey.json';

const getClientNoLogin = () => {
  return google.youtube({
    version: 'v3',
    auth: secrets.API_KEY,
  });
};

const getClientWithToken = (token: Token) => {
  const oauth = getOAuthClient()[0];
  oauth.setCredentials(token);

  return google.youtube({
    version: 'v3',
    auth: oauth,
  });
};

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
