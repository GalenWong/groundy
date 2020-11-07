import { assert } from 'console';
import SongStore from '../../app/backend/SongStore';

const fs = require('fs');

jest.mock('fs');

describe('songstore', () => {
  it('getInstance', () => {
    expect(SongStore.getInstance(process.cwd())).toBeInstanceOf(SongStore);
  });

  it('getStorageDirectory', () => {
    assert(
      SongStore.getInstance(process.cwd()).getStorageDirectory(),
      process.cwd()
    );
  });

  it('getWriteStream', () => {
    SongStore.getInstance(process.cwd()).getWriteStream('dummy.txt');
    expect(fs.createWriteStream).toHaveBeenCalled();
  });

  it('delete', () => {
    SongStore.getInstance(process.cwd()).delete('dummy.txt');
    expect(fs.unlink).toHaveBeenCalled();
  });

  it('getAllSongs', () => {
    SongStore.getInstance(process.cwd()).getAllSongs();
    expect(fs.readdir).toHaveBeenCalled();
  });
});
