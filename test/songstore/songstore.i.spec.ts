import { assert } from 'console';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import SongStore from '../../app/backend/SongStore';

const writeFile = require('util').promisify(fs.writeFile);

function beforeTest(): string {
  const tempDir = os.tmpdir();
  SongStore.setInstance(tempDir);
  const filePath = path.join(tempDir, 'dummy.txt');
  writeFile(filePath, 'hello world');
  return filePath;
}

describe('songstoreInteg', () => {
  it('getAllSongs', async () => {
    beforeTest();
    const songs = await SongStore.getInstance().getAllSongs();
    assert(songs.length, 1);
  });

  it('delete', async () => {
    const filePath = beforeTest();
    expect(fs.existsSync(filePath)).toEqual(true);
    await SongStore.getInstance().delete('dummy.txt');
    expect(fs.existsSync(filePath)).toEqual(false);
  });

  it('getWriteStream', async () => {
    beforeTest();
    const w = await SongStore.getInstance().getWriteStream('dummy.txt');
    expect(w).toBeInstanceOf(fs.WriteStream);
  });
});
