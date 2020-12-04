import Database from '../database/index';
import { resolveSongFromDb } from './utils';

/**
 * Get all downloaded songs in an array
 *
 * @async
 * @returns {Promise<(Song | DownloadedSong)[]>} - Promise that resolves to an array of songs downloaded
 */
export default async () => {
  const db = Database.getExistingInstance();
  const downloads = await db.getAllSongs();
  const songPromises = downloads.map((v) => resolveSongFromDb(v));
  return Promise.all(songPromises);
};
