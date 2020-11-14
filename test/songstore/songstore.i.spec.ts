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
    const s = SongStore.getInstance();
    s.setDirectory(tempDir);
    const songs = await s.getAllSongs();
    expect(songs).toEqual(expect.arrayContaining(['dummy.txt']));
  });

  it('delete', async () => {
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'dummy.txt');
    await writeFile(filePath, 'hello world');
    expect(fs.existsSync(filePath)).toEqual(true);
    const s = SongStore.getInstance();
    s.setDirectory(tempDir);
    await s.delete('dummy.txt');
    expect(fs.existsSync(filePath)).toEqual(false);
  });

  it('getWriteStream', async () => {
    const tempDir = os.tmpdir();
    const s = SongStore.getInstance();
    s.setDirectory(tempDir);
    const w = await s.getWriteStream('dummy.txt');
    expect(w).toBeInstanceOf(fs.WriteStream);
  });
});
