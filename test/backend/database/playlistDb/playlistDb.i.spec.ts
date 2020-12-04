/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../../../app/backend/database';
import { Song } from '../../../../app/types/index';

function getRand() {
  return Math.floor(Math.random() * 10000);
}

describe('database', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('createPlaylist', async () => {
    const database = Database.getInstance(tempDir);

    const song: Song = {
      ytID: `my_ytid_${getRand()}`,
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
      downloaded: true,
    };

    const s = await database.createSong(song);
    const TEST_PLAYLIST_NAME = 'my_playlist';

    const p = await database.createPlaylist(TEST_PLAYLIST_NAME);
    expect(p.key).toEqual('playlist');
    expect(p.name).toEqual(TEST_PLAYLIST_NAME);
    await database.updatePlaylist(p._id, { songs: [s.ytid] });
    const udpatedP = await database.getOnePlaylist(p._id);
    expect(udpatedP.songs).toContainEqual(expect.objectContaining(song));
  });

  it('getOnePlaylist', async () => {
    const database = Database.getInstance(tempDir);

    const p = await database.createPlaylist('my_name');
    let result = await database.getOnePlaylist(p._id);
    expect(p.key).toEqual('playlist');

    database.updatePlaylist(p._id, { name: 'hello world' });
    result = await database.getOnePlaylist(p._id);
    expect(result.name).toEqual('hello world');
  });

  it('getAllPlaylists', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      name: 'my_name',
      songs: [],
    };

    const p = await database.createPlaylist('my_name');
    let result = await database.getAllPlaylists();
    expect(result).toContainEqual(expect.objectContaining(data));

    database.deletePlaylist(p._id);
    result = await database.getAllPlaylists();
    expect(result).not.toContainEqual(expect.objectContaining(p));
  });

  it('fail on insert non existing songs', async () => {
    const database = Database.getInstance(tempDir);
    const p = await database.createPlaylist('playlist1');
    await expect(async () => {
      await database.updatePlaylist(p._id, { songs: ['non_existing_song_id'] });
    }).rejects.toThrow();
  });
});
