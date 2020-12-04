import { DownloadedSong, Song } from '../../types';
import { getToken } from '../authentication';
import * as yt from '../youtubeData';
import { resolveSongFromDb } from './utils';

/**
 * Get a public song with an ID
 *
 * @async
 * @param {string} songID - ID of a public song
 * @returns {Promise<Song>} - Promise that resolves to a Song or DownloadedSong
 */
export default async (ytid: string): Promise<Song | DownloadedSong> => {
  const token = await getToken();
  const ytSong = await yt.getSongById(ytid, token ?? undefined);

  return resolveSongFromDb(ytSong);
};
