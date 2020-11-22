/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../app/backend/database';

function getRand() {
  return Math.floor(Math.random() * 10000);
}

describe('database', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('createPlaylist', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      key: 'playlist',
      id: `my_id_${getRand()}`,
      name: 'my_name',
      songs: [{ name: 'my song' }],
    };

    const p = await database.createPlaylist(data);
    expect(p.key).toEqual('playlist');
    expect(p.id).toEqual(data.id);
    expect(p.name).toEqual('my_name');
    expect(p.songs).toContainEqual(
      expect.objectContaining({ name: 'my song' })
    );
  });

  it('getOnePlaylist', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      key: 'playlist',
      id: `my_id_${getRand()}`,
      name: 'my_name',
      songs: [{ name: 'my song' }],
    };

    const p = await database.createPlaylist(data);
    let result = await database.getOnePlaylist(data.id);
    expect(p.key).toEqual('playlist');
    expect(result.id).toEqual(data.id);

    database.updatePlaylist(p._id, { name: 'hello world' });
    result = await database.getOnePlaylist(data.id);
    expect(result.name).toEqual('hello world');
  });

  it('getAllPlaylists', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      key: 'playlist',
      id: `my_id_${getRand()}`,
      name: 'my_name',
      songs: [{ name: 'my song' }],
    };

    const p = await database.createPlaylist(data);
    let result = await database.getAllPlaylists();
    expect(result).toContainEqual(expect.objectContaining(p));

    database.deletePlaylist(p._id);
    result = await database.getAllPlaylists();
    expect(result).not.toContainEqual(expect.objectContaining(p));
  });
});
