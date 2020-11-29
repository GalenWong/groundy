import Database from '../database/index';
import { Song } from '../../types/index';

export default async (): Promise<Song[]> => {
  const db = Database.getExistingInstance();
  const downloads = await db.getAllSongs();
  return downloads;
};
