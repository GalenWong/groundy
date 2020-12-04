import { Playlist } from '../../types/index';
import PlaylistModule from '../playlist/index';
import { resolveSongFromDb } from './utils';

/**
 * Get info of a playlist
 *
 * @async
 * @param {string} playlistID - the unique ID of a local playlist
 * @returns {Promise<Playlist>} - Promise that resolves to a Playlist
 */
export default async (id: string): Promise<Playlist> => {
  const playlistModule = new PlaylistModule();
  const p = await playlistModule.getPlaylist(id);

  const songPromises = p.songs.map((s) =>
    resolveSongFromDb({ ytID: s.ytID, title: s.title, channel: s.channel })
  );
  const songs = await Promise.all(songPromises);
  p.songs = songs;

  return p;
};
