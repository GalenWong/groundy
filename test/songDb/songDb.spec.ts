import * as os from 'os';
import * as path from 'path';
import SongDB from '../../app/backend/SongDB';

jest.mock('fs');

describe('songDb', () => {
  it('createDd', async () => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'song.db');
    const songDb = SongDB.getInstance(tempDir);
    expect(songDb.getDirectory()).toEqual(filePath);
  });

  it('validateTrue', () => {
    const tempDir = os.tmpdir();
    const songDb = SongDB.getInstance(tempDir);

    const data = {
      ytid: 'my_ytid',
      title: 'my_title',
      channel: 'my_channel',
      fileName: 'my_filename',
      thumbnailUrl: 'my_thumbnailUrl',
    };
    expect(songDb.validate(data)).toEqual(true);
  });

  it('validateTrue', () => {
    const tempDir = os.tmpdir();
    const songDb = SongDB.getInstance(tempDir);
    expect(songDb.validate({ ytid: 1 })).toEqual(false);
    expect(songDb.validate({ ytid: 'my_ytid' })).toEqual(false);
  });
});
