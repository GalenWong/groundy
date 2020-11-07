import { assert } from 'console';
import SongStore from '../../app/backend/SongStore';

const os = require('os');
const fs = require('fs');

jest.mock('fs');

describe('songstore', () => {
  const tempDir = os.tmpdir();
  it('getInstance', () => {
    expect(SongStore.getInstance(tempDir)).toBeInstanceOf(SongStore);
  });

  it('getStorageDirectory', () => {
    const tempDir = os.tmpdir();
    assert(SongStore.getInstance(tempDir).getStorageDirectory(), tempDir);
  });

  it('getWriteStream', () => {
    const tempDir = os.tmpdir();
    SongStore.getInstance(tempDir).getWriteStream('dummy.txt');
    expect(fs.createWriteStream).toHaveBeenCalled();
  });

  it('delete', () => {
    const tempDir = os.tmpdir();
    SongStore.getInstance(tempDir).delete('dummy.txt');
    expect(fs.unlink).toHaveBeenCalled();
  });

  it('getAllSongs', () => {
    const tempDir = os.tmpdir();
    SongStore.getInstance(tempDir).getAllSongs();
    expect(fs.readdir).toHaveBeenCalled();
  });
});
