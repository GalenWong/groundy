import PlaylistModule from '../playlist/index';
import { Playlist } from '../../types/index';

/**
 * Create a new local playlist
 *
 * @async
 * @param {string} name - name of the new playlist
 * @returns {Promise<Playlist>} - Promise that resolves to a Playlist
 */
export default async (name: string): Promise<Playlist> => {
  const playlistModule = new PlaylistModule();
  const p = await playlistModule.createPlaylist(name);
  return p;
};
