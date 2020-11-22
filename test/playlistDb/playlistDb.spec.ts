import * as os from 'os';
import * as path from 'path';
import Database from '../../app/backend/database';

jest.mock('fs');

describe('database', () => {
  it('createDatabase', async () => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'database.db');
    const database = Database.getInstance(tempDir);
    expect(database.getDirectory()).toEqual(filePath);
  });

  it('validatePlaylist', () => {
    const tempDir = os.tmpdir();
    const database = Database.getInstance(tempDir);

    const data = {
      key: 'playlist',
      id: 'my_id',
      name: 'my_name',
      songs: [],
    };
    expect(database.validatePlaylist(data)).toEqual(true);
  });

  it('validateSong', () => {
    const tempDir = os.tmpdir();
    const database = Database.getInstance(tempDir);
    expect(database.validatePlaylist({ id: 1 })).toEqual(false);
    expect(database.validatePlaylist({ id: 'my_ytid' })).toEqual(false);
  });
});
