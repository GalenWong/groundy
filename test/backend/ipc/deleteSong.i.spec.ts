import path from 'path';
import os from 'os';
import * as fs from 'fs';
import { promisify } from 'util';
import Database from '../../../app/backend/database';
import SongStore from '../../../app/backend/SongStore';
import deleteSong from '../../../app/backend/ipc/deleteSong';
import PlaylistModule from '../../../app/backend/playlist';

const writeFile = promisify(fs.writeFile);

describe('deleteSong endpoint', () => {
  it('throw on song not found', async () => {
    const thunk = expect(async () => {
      await deleteSong('this_id_does_not_exist');
    });

    await thunk.rejects.toThrow();
  });

  it('remove song from playlist', async () => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'dummy.mp3');
    await writeFile(filePath, 'hello world');
    const db = Database.getInstance(tempDir);
    SongStore.getInstance().setDirectory(tempDir);

    await db.createSong({
      ytID: 'my_dummy_id',
      fileName: 'dummy.mp3',
      channel: 'fake_channel',
      title: 'fake_title',
      downloaded: true,
    });

    const playlistUtils = new PlaylistModule();
    const playlist = await playlistUtils.createPlaylist('my_dummy_playlist');
    await playlistUtils.addSong('my_dummy_id', playlist.id);

    await deleteSong('my_dummy_id');

    const song = await db.getOneSong('my_dummy_id');
    expect(song).toBeNull();

    const changedList = await playlistUtils.getPlaylist(playlist.id);
    expect(changedList.songs).toHaveLength(0);

    expect(fs.existsSync(filePath)).toEqual(false);
  });
});
