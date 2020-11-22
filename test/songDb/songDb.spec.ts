/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../app/backend/database';
import { Song } from '../../app/types/index';

jest.mock('fs');

describe('database', () => {
  it('createDatabase', async () => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'database.db');
    const database = Database.getInstance(tempDir);
    expect(database.getDirectory()).toEqual(filePath);
  });

  it('validateSongTrue', () => {
    const tempDir = os.tmpdir();
    const database = Database.getInstance(tempDir);

    const data = {
      ytid: 'my_ytid',
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
    } as Song;
    expect(database.validateSong(data)).toEqual(true);
  });

  it('validateSongFalse', () => {
    const tempDir = os.tmpdir();
    const database = Database.getInstance(tempDir);
    expect(database.validateSong({ ytid: 1 })).toEqual(false);
    expect(database.validateSong({ ytid: 'my_ytid' })).toEqual(false);
  });
});
