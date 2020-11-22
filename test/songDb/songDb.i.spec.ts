/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../app/backend/database';

function getRand() {
  return Math.floor(Math.random() * 10000);
}

describe('database', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('createSong', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      ytid: `my_ytid_${getRand()}`,
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
    };

    const s = await database.createSong(data);
    expect(s.key).toEqual('song');
    expect(s.ytid).toEqual(data.ytid);
    expect(s.title).toEqual('my_title');
    expect(s.channel).toEqual('my_channel');
    expect(s.fileName).toEqual('my_filename');
    expect(s.thumbnailUrl).toEqual('my_thumbnailUrl');

    // Test duplicate
    const ss = await database.createSong(data);
    expect(ss).toBeNull();
  });

  it('getOneSong', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      ytid: `my_ytid_${getRand()}`,
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
    } as Song;

    const s = await database.createSong(data);
    let result = await database.getOneSong(data.ytid);
    expect(s.key).toEqual('song');
    expect(result.ytid).toEqual(data.ytid);
    expect(result.title).toEqual('my_title');
    expect(result.channel).toEqual('my_channel');
    expect(result.fileName).toEqual('my_filename');
    expect(result.thumbnailUrl).toEqual('my_thumbnailUrl');

    // Test if ytid does not exist
    const resultNull = await database.getOneSong('dummy_ytid');
    expect(resultNull).toBeNull();

    database.updateSong(s.ytid, { title: 'hello world' });
    result = await database.getOneSong(data.ytid);
    expect(result.title).toEqual('hello world');
  });

  it('getAllSongs', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      ytid: `my_ytid_${getRand()}`,
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
    } as Song;

    const s = await database.createSong(data);
    let result = await database.getAllSongs();
    expect(result).toContainEqual(expect.objectContaining(s));

    database.deleteSong(s.ytid);
    result = await database.getAllSongs();
    expect(result).not.toContainEqual(expect.objectContaining(s));
  });
});
