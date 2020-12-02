import Database from '../database';
import { resolveSongFromDb } from './utils';

/**
 * if song is not in db, return null.
 * if song is in db, return the fresh state
 */
export default async (ytid: string) => {
  const db = Database.getExistingInstance();
  const song = await db.getOneSong(ytid);
  console.log('get song state');
  if (song === null) return null;
  return resolveSongFromDb(song);
};
