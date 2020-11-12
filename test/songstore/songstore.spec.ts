import { assert } from 'console';
import * as os from 'os';
import * as fs from 'fs';
import SongStore from '../../app/backend/SongStore';

jest.mock('fs');

describe('songstore', () => {
  it('getInstance', () => {
    const tempDir = os.tmpdir();
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
