import { Playlist } from '../../types';
import { getToken } from '../authentication';
import * as yt from '../youtubeData';
import { resolveSongFromDb } from './utils';

export default async (): Promise<Playlist> => {
  const token = await getToken();
  if (token === null)
    throw new Error('cannot get recommendation when logged out');
  const songs = await yt.getRecommendations(token);

  const songPromises = songs.map((s) => resolveSongFromDb(s));

  return {
    name: 'YouTube My Mix',
    id: 'RDMM',
    songs: await Promise.all(songPromises),
  };
};
