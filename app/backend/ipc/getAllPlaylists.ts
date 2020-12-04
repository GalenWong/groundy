import PlaylistModule from '../playlist/index';
import { Playlist } from '../../types/index';
import { resolveSongFromDb } from './utils';

/**
 * Get all local playlists
 *
 * @async
 * @returns {Promise<Playlist[]>} - Promise that resolves to an array of local playlists
 */
export default async (): Promise<Playlist[]> => {
  const playlistModule = new PlaylistModule();
  const playlists = await playlistModule.getAllPlaylists();

  return Promise.all(
    playlists.map(async (p) => {
      const resolvedSongs = await Promise.all(
        p.songs.map((s) =>
          resolveSongFromDb({
            ytID: s.ytID,
            title: s.title,
            channel: s.channel,
          })
        )
      );
      const playlist = p;
      playlist.songs = resolvedSongs;
      return playlist;
    })
  );
};
