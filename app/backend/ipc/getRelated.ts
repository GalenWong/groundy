import { getToken } from '../authentication';
import * as yt from '../youtubeData';
import { resolveSongFromDb } from './utils';

/**
 * Get an array of related songs based on a ytid
 *
 * @async
 * @param {string} ytid - ytid of the song
 * @returns {Promise<(Downloaded | Song)[]>} - Promise that resolves to an array of related songs
 */
export default async (ytid: string) => {
  const token = await getToken();
  const songs = await yt.getRelated(ytid, token ?? undefined);

  return Promise.all(songs.map((song) => resolveSongFromDb(song)));
};
