import PlaylistModule from '../playlist/index';
import { Playlist } from '../../types/index';

export default async (): Promise<Playlist[]> => {
  const playlistModule = new PlaylistModule();
  const playlists = await playlistModule.getAllPlaylists();
  return playlists as Playlist[];
};
