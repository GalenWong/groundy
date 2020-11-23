/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../../../app/backend/database';
import { Song } from '../../../../app/types';

function getRand() {
  return Math.floor(Math.random() * 10000);
}

describe('database', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('createSong', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      ytID: `my_ytid_${getRand()}`,
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
      downloaded: true,
    };

    const s = await database.createSong(data);
    expect(s.key).toEqual('song');
    expect(s.ytid).toEqual(data.ytID);
    expect(s.title).toEqual('my_title');
    expect(s.channel).toEqual('my_channel');
    expect(s.fileName).toEqual('my_filename');
    expect(s.thumbnailUrl).toEqual('my_thumbnailUrl');

    // Test duplicate
    await expect(async () => {
      await database.createSong(data);
    }).rejects.toThrow();
  });

  it('getOneSong', async () => {
    const database = Database.getInstance(tempDir);

    const data: Song = {
      ytID: `my_ytid_${getRand()}`,
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
      downloaded: true,
    };

    const s = await database.createSong(data);
    let result = await database.getOneSong(data.ytID);
    expect(s.key).toEqual('song');
    expect(result.ytID).toEqual(data.ytID);
    expect(result.title).toEqual('my_title');
    expect(result.channel).toEqual('my_channel');
    expect(result.fileName).toEqual('my_filename');
    expect(result.thumbnailUrl).toEqual('my_thumbnailUrl');

    // Test if ytid does not exist
    const resultNull = await database.getOneSong('dummy_ytid');
    expect(resultNull).toBeNull();

    database.updateSong(s.ytid, { title: 'hello world' });
    result = await database.getOneSong(data.ytID);
    expect(result.title).toEqual('hello world');
  });

  it('getAllSongs', async () => {
    const database = Database.getInstance(tempDir);

    const data: Song = {
      ytID: `my_ytid_${getRand()}`,
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
      downloaded: true,
    };

    await database.createSong(data);
    let result = await database.getAllSongs();
    expect(result).toContainEqual(expect.objectContaining(data));

    database.deleteSong(data.ytID);
    result = await database.getAllSongs();
    expect(result).not.toContainEqual(expect.objectContaining(data));
  });
});
