import { Playlist } from '../../types/index';
import PlaylistModule from '../playlist/index';

export default async (id: string): Promise<Playlist> => {
  const playlistModule = new PlaylistModule();
  const p = await playlistModule.getPlaylist(id);
  return p as Playlist;
};
