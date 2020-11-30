import { Song, DownloadedSong } from '../../types';
import { getToken } from '../authentication';
import * as yt from '../youtubeData';
import { resolveSongFromDb } from './utils';

export default async (): Promise<(DownloadedSong | Song)[]> => {
  const token = await getToken();
  if (token === null)
    throw new Error('cannot get recommendation when logged out');
  const songs = await yt.getRecommendations(token);

  const songPromises = songs.map((s) => resolveSongFromDb(s));
  const recommendedSongs = await Promise.all(songPromises);
  return recommendedSongs;
};
