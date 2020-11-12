import { assert } from 'console';
import * as os from 'os';
import * as fs from 'fs';
import SongStore from '../../app/backend/SongStore';

jest.mock('fs');

describe('songstore', () => {
  it('getInstance', () => {
    const tempDir = os.tmpdir();
    SongStore.setInstance(tempDir);
    expect(SongStore.getInstance()).toBeInstanceOf(SongStore);
  });

  it('getStorageDirectory', () => {
    const tempDir = os.tmpdir();
    SongStore.setInstance(tempDir);
    assert(SongStore.getInstance().getStorageDirectory(), tempDir);
  });

  it('getWriteStream', () => {
    const tempDir = os.tmpdir();
    SongStore.setInstance(tempDir);
    SongStore.getInstance().getWriteStream('dummy.txt');
    expect(fs.createWriteStream).toHaveBeenCalled();
  });

  it('delete', () => {
    const tempDir = os.tmpdir();
    SongStore.setInstance(tempDir);
    SongStore.getInstance().delete('dummy.txt');
    expect(fs.unlink).toHaveBeenCalled();
  });

  it('getAllSongs', () => {
    const tempDir = os.tmpdir();
    SongStore.setInstance(tempDir);
    SongStore.getInstance().getAllSongs();
    expect(fs.readdir).toHaveBeenCalled();
  });
});
