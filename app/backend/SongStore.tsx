import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const unlink = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);

export default class SongStore {
  private static instance: SongStore;

  private static storageDirectory: string;

  private constructor(storageDirectory: string) {
    SongStore.storageDirectory = storageDirectory;
  }

  static getInstance(): SongStore | null {
    if (!SongStore.storageDirectory) return null;
    return SongStore.instance;
  }

  static setInstance(storageDirectory: string): void {
    SongStore.storageDirectory = storageDirectory;
    SongStore.instance = new SongStore(storageDirectory);
  }

  getWriteStream(nameOfFile: string): fs.WriteStream {
    const filePath = path.join(SongStore.storageDirectory, nameOfFile);
    return fs.createWriteStream(filePath);
  }

  async delete(nameOfFile: string): Promise<void> {
    const filePath = path.join(SongStore.storageDirectory, nameOfFile);
    await unlink(filePath);
  }

  getStorageDirectory(): string {
    return SongStore.storageDirectory;
  }

  async getAllSongs(): Promise<string[]> {
    const songs = await readdir(SongStore.storageDirectory);
    return songs;
  }
}
