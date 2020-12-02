import { Playlist } from '../../types';
import Database from '../database';
import { notifyError } from '../ipc-renderer';
import PlaylistModule from '../playlist';
import startDownload from './startDownload';

/**
 * id of input playlist can be anything
 */
export default async (playlistArg: Playlist) => {
  const playlistUtil = new PlaylistModule();
  const db = Database.getExistingInstance();
  const playlist = await playlistUtil.createPlaylist(playlistArg.name);
  const downloadAndAddPromises = playlistArg.songs.map(async (s) => {
    const ytid = s.ytID;
    const song = await db.getOneSong(ytid);
    if (song === null || !song.downloaded) {
      try {
        await startDownload(ytid);
      } catch (e) {
        notifyError(e.message);
      }
    }
    // await playlistUtil.addSong(ytid, playlist.id);
  });
  await Promise.all(downloadAndAddPromises);

  // add song one by one to prevent race
  // eslint-disable-next-line no-restricted-syntax
  for (const song of playlistArg.songs) {
    // eslint-disable-next-line no-await-in-loop
    await playlistUtil.addSong(song.ytID, playlist.id);
  }
};
