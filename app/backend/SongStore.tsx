import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const unlink = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);

export default class SongStore {
  private static instance: SongStore;

  private storageDirectory: string;

  private constructor(storageDirectory: string) {
    this.storageDirectory = storageDirectory;
  }

  static getInstance(storageDirectory: string): SongStore | null {
    if (storageDirectory === '') return null;
    if (!SongStore.instance) {
      SongStore.instance = new SongStore(storageDirectory);
    }
    return SongStore.instance;
  }

  getWriteStream(nameOfFile: string): fs.WriteStream {
    const filePath = path.join(this.storageDirectory, nameOfFile);
    return fs.createWriteStream(filePath);
  }

  async delete(nameOfFile: string): Promise<void> {
    const filePath = path.join(this.storageDirectory, nameOfFile);
    await unlink(filePath);
  }

  getStorageDirectory(): string {
    return this.storageDirectory;
  }

  async getAllSongs(): Promise<string[]> {
    const songs = await readdir(this.storageDirectory);
    return songs;
  }
}
