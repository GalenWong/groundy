import * as os from 'os';
import * as path from 'path';
import Database from '../../app/backend/database';
// import { Playlist } from '../types/index.d';

jest.mock('fs');

describe('database', () => {
  it('createDatabase', async () => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'database.db');
    const database = Database.getInstance(tempDir);
    expect(database.getDirectory()).toEqual(filePath);
  });

  it('validatePlaylistTrue', () => {
    const tempDir = os.tmpdir();
    const database = Database.getInstance(tempDir);

    const data = {
      id: 'my_id',
      name: 'my_name',
      songs: [],
    };
    expect(database.validatePlaylist(data)).toEqual(true);
  });

  it('validatePlaylistFalse', () => {
    const tempDir = os.tmpdir();
    const database = Database.getInstance(tempDir);
    expect(database.validatePlaylist({ id: 1 })).toEqual(false);
    expect(database.validatePlaylist({ id: 'my_ytid' })).toEqual(false);
  });
});
