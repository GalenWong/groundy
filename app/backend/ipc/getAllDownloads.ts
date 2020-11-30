import Database from '../database/index';
import { resolveSongFromDb } from './utils';

export default async () => {
  const db = Database.getExistingInstance();
  const downloads = await db.getAllSongs();
  const songPromises = downloads.map((v) => resolveSongFromDb(v));
  return Promise.all(songPromises);
};
