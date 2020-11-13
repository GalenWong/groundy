import * as os from 'os';
import * as fs from 'fs';
import SongStore from '../../app/backend/SongStore';

jest.mock('fs');

describe('songstore', () => {
  it('getInstance', () => {
    expect(SongStore.getInstance()).toBeInstanceOf(SongStore);
  });

  it('getStorageDirectory', () => {
    const tempDir = os.tmpdir();
    const s = SongStore.getInstance();
    s.setDirectory(tempDir);
    expect(s.getStorageDirectory()).toEqual(tempDir);
  });

  it('getWriteStream', () => {
    const tempDir = os.tmpdir();
    const s = SongStore.getInstance();
    s.setDirectory(tempDir);
    s.getWriteStream('dummy.txt');
    expect(fs.createWriteStream).toHaveBeenCalled();
  });

  it('delete', () => {
    const tempDir = os.tmpdir();
    const s = SongStore.getInstance();
    s.setDirectory(tempDir);
    s.delete('dummy.txt');
    expect(fs.unlink).toHaveBeenCalled();
  });

  it('getAllSongs', () => {
    const tempDir = os.tmpdir();
    const s = SongStore.getInstance();
    s.setDirectory(tempDir);
    s.getAllSongs();
    expect(fs.readdir).toHaveBeenCalled();
  });
});
