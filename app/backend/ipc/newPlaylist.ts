import PlaylistModule from '../playlist/index';
import { Playlist } from '../../types/index';

export default async (name: string): Promise<Playlist> => {
  const playlistModule = new PlaylistModule();
  const p = await playlistModule.createPlaylist(name);
  return p;
};
