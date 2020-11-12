import { assert } from 'console';
import * as path from 'path';
import mock from 'mock-fs';
import SongStore from '../../app/backend/SongStore';

const os = require('os');
const fs = require('fs');
const writeFile = require('util').promisify(fs.writeFile);

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

  // it('getAllSongs', async () => {
  //   const tempDir = os.tmpdir();
  //   SongStore.setInstance(tempDir);
  //   const filePath = path.join(tempDir, 'dummy.txt');
  //   writeFile(filePath, 'hello world');
  //   const songs = await SongStore.getInstance().getAllSongs();
  //   console.log(songs);
  // });

  // it('getAllSongs', async () => {
  //   const tempDir = os.tmpdir();
  //   SongStore.setInstance(tempDir);
  //   const filePath = path.join(tempDir, 'dummy.txt');
  //   fs.writeFileSync(filePath, 'hello world');
  //   const songs = await SongStore.getInstance().getAllSongs();
  //   console.log(songs);
  // });

  // it('delete', async () => {
  //   const tempDir = os.tmpdir();
  //   SongStore.setInstance(tempDir);
  //   const filePath = path.join(tempDir, 'dummy.txt');
  //   writeFile(filePath, 'hello world');
  //   await SongStore.getInstance().delete('dummy.txt');

  // });

  // it('getWriteStream', async () => {
  //   const tempDir = os.tmpdir();
  //   SongStore.setInstance(tempDir);
  //   const filePath = path.join(tempDir, 'dummy.txt');
  //   writeFile(filePath, 'hello world');
  //   const w = await SongStore.getInstance().getWriteStream('dummy.txt');
  //   //expect(w).toBeInstanceOf(fs.WriteStream);
  // });
});
