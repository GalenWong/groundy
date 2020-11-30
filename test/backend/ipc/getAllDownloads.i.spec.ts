import os from 'os';
import path from 'path';
import { mkdirSync } from 'fs';
import getAllDownloads from '../../../app/backend/ipc/getAllDownloads';
import Database from '../../../app/backend/database';
import SongStore from '../../../app/backend/SongStore';
import { DownloadedSong } from '../../../app/types';

describe('getAllDownloads', () => {
  it('resolve file path', async () => {
    const randomStr = Math.random().toString();
    const tempDir = path.join(os.tmpdir(), randomStr);
    mkdirSync(tempDir, { recursive: true });
    const db = Database.getInstance(tempDir);
    SongStore.getInstance().setDirectory(tempDir);
    await db.createSong({
      ytID: 'my_dummy_id',
      fileName: 'dummy.mp3',
      channel: 'fake_channel',
      title: 'fake_title',
      downloaded: true,
    });
    await db.createSong({
      ytID: 'my_dummy_id_2',
      fileName: undefined,
      channel: 'fake_channel',
      title: 'fake_title',
      downloaded: false,
    });

    const songs = await getAllDownloads();
    const song1List = songs.filter((v) => v.ytID === 'my_dummy_id');
    expect(song1List.length).toBe(1);
    expect((song1List[0] as DownloadedSong).filePath).toBe(
      path.join(tempDir, 'dummy.mp3')
    );
    expect(song1List[0].downloaded).toBe(true);

    const song2List = songs.filter((v) => v.ytID === 'my_dummy_id_2');
    expect(song2List.length).toBe(1);
    expect(song2List[0].downloaded).toBe(false);
  });
});
