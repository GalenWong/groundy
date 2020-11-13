import { assert } from 'console';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import SongStore from '../../app/backend/SongStore';

const writeFile = require('util').promisify(fs.writeFile);

describe('songstoreInteg', () => {
  it('getAllSongs', async () => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'dummy.txt');
    await writeFile(filePath, 'hello world');
    const songs = await SongStore.getInstance(tempDir).getAllSongs();
    assert(songs.length, 1);
    assert(songs[0], 'dummy.txt');
  });

  it('delete', async () => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'dummy.txt');
    await writeFile(filePath, 'hello world');
    expect(fs.existsSync(filePath)).toEqual(true);
    await SongStore.getInstance(tempDir).delete('dummy.txt');
    expect(fs.existsSync(filePath)).toEqual(false);
  });

  it('getWriteStream', async () => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'dummy.txt');
    const w = await SongStore.getInstance(tempDir).getWriteStream('dummy.txt');
    expect(w).toBeInstanceOf(fs.WriteStream);
  });
});
