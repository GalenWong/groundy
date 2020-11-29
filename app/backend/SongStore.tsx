import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const unlink = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);

export default class SongStore {
  private static instance: SongStore;

  private storageDirectory?: string;

  static getInstance(): SongStore {
    if (!SongStore.instance) {
      SongStore.instance = new SongStore();
    }
    return SongStore.instance;
  }

  setDirectory(storageDirectory: string): void {
    if (storageDirectory === '') {
      throw new Error('storageDirectory cannot be empty.');
    }
    fs.mkdirSync(storageDirectory, { recursive: true });
    this.storageDirectory = storageDirectory;
  }

  getWriteStream(nameOfFile: string): fs.WriteStream {
    const filePath = path.join(this.getStorageDirectory(), nameOfFile);
    return fs.createWriteStream(filePath);
  }

  /**
   * @async
   */
  async delete(nameOfFile: string): Promise<void> {
    const filePath = path.join(this.getStorageDirectory(), nameOfFile);
    await unlink(filePath);
  }

  getStorageDirectory(): string {
    if (this.storageDirectory === undefined) {
      throw new Error('StorageDirectory is uninitialized');
    }
    return this.storageDirectory;
  }

  async getAllSongs(): Promise<string[]> {
    const songs = await readdir(this.getStorageDirectory());
    return songs;
  }
}
