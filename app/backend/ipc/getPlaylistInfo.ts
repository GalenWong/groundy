import { Playlist } from '../../types/index';
import PlaylistModule from '../playlist/index';
import { resolveSongFromDb } from './utils';

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
