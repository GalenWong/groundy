import Database from '../database';
import PlaylistModule from '../playlist';
import SongStore from '../SongStore';

export default async (ytid: string) => {
  const db = Database.getExistingInstance();
  const song = await db.getOneSong(ytid);
  if (song === null) {
    throw new Error(`deleteSong: cannot find song ${ytid}`);
  }

  // remove from all playlist
  const playlistUtils = new PlaylistModule();
  const playlists = await playlistUtils.getAllPlaylists();

  const removePromises = playlists.map((playlist) => {
    if (playlist.songs.some((v) => v.ytID === song.ytID)) {
      return playlistUtils.removeSong(song.ytID, playlist.id);
    }
    return null;
  });

  await Promise.all(removePromises);

  // delete from db
  await db.deleteSong(song.ytID);

  // delete from file
  if (song.downloaded) {
    if (song.fileName) SongStore.getInstance().delete(song.fileName);
    else throw new Error(`downloaded without filename: ${song}`);
  }
};
