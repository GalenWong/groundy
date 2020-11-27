import { Playlist } from '../../types';
import { getToken } from '../authentication';
import * as yt from '../youtubeData';
import { resolveSongFromDb } from './utils';

export default async (id: string): Promise<Playlist> => {
  const token = await getToken();
  const ytList = await yt.getPlaylist(id, token ?? undefined);

  const songPromises = ytList.songs.map((s) => resolveSongFromDb(s));

  return {
    name: ytList.name,
    id,
    songs: await Promise.all(songPromises),
  };
};
