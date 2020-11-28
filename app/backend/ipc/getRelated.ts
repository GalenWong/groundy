import { getToken } from '../authentication';
import * as yt from '../youtubeData';
import { resolveSongFromDb } from './utils';

export default async (ytid: string) => {
  const token = await getToken();
  const songs = await yt.getRelated(ytid, token ?? undefined);

  return Promise.all(songs.map((song) => resolveSongFromDb(song)));
};
