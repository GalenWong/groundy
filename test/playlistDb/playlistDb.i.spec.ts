/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../app/backend/database';
import { Playlist } from '../types/index.d';

function getRand() {
  return Math.floor(Math.random() * 10000);
}

describe('database', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('createPlaylist', async () => {
    const database = Database.getInstance(tempDir);

    const song = {
      ytid: `my_ytid_${getRand()}`,
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
    } as Song;

    const s = await database.createSong(song);

    const data = {
      name: 'my_name',
      songs: [{ ytid: s.ytid }],
    } as Playlist;

    const p = await database.createPlaylist(data);
    expect(p.key).toEqual('playlist');
    expect(p.name).toEqual('my_name');
    expect(p.songs).toContainEqual(expect.objectContaining({ ytid: s.ytid }));
  });

  it('getOnePlaylist', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      name: 'my_name',
      songs: [],
    };

    const p = await database.createPlaylist(data);
    let result = await database.getOnePlaylist(p.id);
    expect(p.key).toEqual('playlist');
    expect(result.id).toEqual(p.id);

    database.updatePlaylist(p.id, { name: 'hello world' });
    result = await database.getOnePlaylist(p.id);
    expect(result.name).toEqual('hello world');
  });

  it('getAllPlaylists', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      name: 'my_name',
      songs: [],
    };

    const p = await database.createPlaylist(data);
    let result = await database.getAllPlaylists();
    expect(result).toContainEqual(expect.objectContaining(p));

    database.deletePlaylist(p.id);
    result = await database.getAllPlaylists();
    expect(result).not.toContainEqual(expect.objectContaining(p));
  });
});
