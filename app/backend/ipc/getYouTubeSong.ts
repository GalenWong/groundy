import { DownloadedSong, Song } from '../../types';
import { getToken } from '../authentication';
import * as yt from '../youtubeData';
import { resolveSongFromDb } from './utils';

export default async (ytid: string): Promise<Song | DownloadedSong> => {
  const token = await getToken();
  const ytSong = await yt.getSongById(ytid, token ?? undefined);

  return resolveSongFromDb(ytSong);
};
