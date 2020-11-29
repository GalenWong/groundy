import { getToken } from '../authentication';
import Database from '../database';
import downloader from '../downloader';
import * as yt from '../youtubeData';
import * as frontend from '../ipc-renderer';

export default async (ytid: string) => {
  const db = Database.getExistingInstance();
  const dbSong = await db.getOneSong(ytid);
  if (dbSong?.downloaded) {
    throw new Error(`song ${ytid} already downloaded`);
  }
  const token = await getToken();
  const song = await yt.getSongById(ytid, token ?? undefined);
  const filename = await downloader.startDownload(ytid, song.title);

  if (dbSong === null) {
    await db.createSong({
      ...song,
      downloaded: false,
    });
  } else {
    await db.updateSong(song.ytID, {
      ...song,
      fileName: undefined,
      downloaded: false,
    });
  }

  downloader.addProgressListener(song.ytID, async (stats) => {
    frontend.notifyProgress({
      ytID: song.ytID,
      current: BigInt(stats.downloaded),
      total: BigInt(stats.total),
    });
  });

  downloader.addFinishDownloadListener(song.ytID, async () => {
    await db.updateSong(ytid, { downloaded: true, fileName: filename });
  });
};
