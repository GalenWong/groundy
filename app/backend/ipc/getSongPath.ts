import { DownloadedSong } from '../../types';
import Database from '../database/index';
import { resolveSongFromDb } from './utils';

export default async (ytid: string) => {
  const db = Database.getExistingInstance();
  const s = await db.getOneSong(ytid);
  if (!s) throw new Error(`song does not exist. songId = ${ytid}`);
  const resolvedSong = await resolveSongFromDb({
    ytID: s.ytID,
    title: s.title,
    channel: s.channel,
  });
  if (!resolvedSong.downloaded)
    throw new Error(`song ${s.ytID} is not downloaded`);
  return (resolvedSong as DownloadedSong).filePath;
};
