import path from 'path';
import { DownloadedSong, Song } from '../../types';
import Database from '../database';
import SongStore from '../SongStore';

const resolveSongFromDb = async (song: {
  ytID: string;
  title: string;
  channel: string;
}): Promise<Song | DownloadedSong> => {
  const db = Database.getExistingInstance();
  const dbSong = await db.getOneSong(song.ytID);
  if (dbSong === null) {
    const result: Song = {
      ...song,
      downloaded: false,
    };
    return result;
  }

  if (dbSong.downloaded) {
    if (!dbSong.fileName)
      throw new Error(`filename not found for downloaded song ${dbSong}`);
    const dir = SongStore.getInstance().getStorageDirectory();
    const filePath = path.join(dir, dbSong.fileName);
    const result: DownloadedSong = {
      ...dbSong,
      filePath,
      downloaded: true,
    };
    return result;
  }

  return dbSong;
};

// eslint-disable-next-line import/prefer-default-export
export { resolveSongFromDb };
