import Database from '../database';
import { resolveSongFromDb } from './utils';

/**
 * if song is not in db, return null.
 * if song is in db, return the fresh state
 * @async
 * @param {string} ytid - ytid of asong
 * @returns {Promise<Song | DownloadedSong | null>} - a song or null
 */
export default async (ytid: string) => {
  const db = Database.getExistingInstance();
  const song = await db.getOneSong(ytid);
  console.log('get song state');
  if (song === null) return null;
  return resolveSongFromDb(song);
};
