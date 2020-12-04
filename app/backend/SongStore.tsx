import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const unlink = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);

/**
 * A Singleton class used to interact with the filesystem
 */
export default class SongStore {
  /**
   * The instance
   */
  private static instance: SongStore;

  /**
   * directory that stores all the songs
   */
  private storageDirectory?: string;

  /**
   * To get the instance
   */
  static getInstance(): SongStore {
    if (!SongStore.instance) {
      SongStore.instance = new SongStore();
    }
    return SongStore.instance;
  }

  /**
   * Create a directory to store songs
   *
   * @param {string} storageDirectory - the directory locator string
   */
  setDirectory(storageDirectory: string): void {
    if (storageDirectory === '') {
      throw new Error('storageDirectory cannot be empty.');
    }
    fs.mkdirSync(storageDirectory, { recursive: true });
    this.storageDirectory = storageDirectory;
  }

  /**
   * Write the file into the directory
   *
   * @param {string} nameOfFile - the writing filename
   */
  getWriteStream(nameOfFile: string): fs.WriteStream {
    const filePath = path.join(this.getStorageDirectory(), nameOfFile);
    return fs.createWriteStream(filePath);
  }

  /**
   * Delete a file from the directory
   *
   * @async
   * @param {string} nameOfFile - filename of the to be deleted file
   */
  async delete(nameOfFile: string): Promise<void> {
    const filePath = path.join(this.getStorageDirectory(), nameOfFile);
    await unlink(filePath);
  }

  /**
   * Get where the storage directory is
   *
   * @returns {string} - the directory locator
   */
  getStorageDirectory(): string {
    if (this.storageDirectory === undefined) {
      throw new Error('StorageDirectory is uninitialized');
    }
    return this.storageDirectory;
  }

  /**
   * Get all songs in the storage directory
   *
   * @async
   * @returns {Promise<string[]>} - an array of all the filenames
   */
  async getAllSongs(): Promise<string[]> {
    const songs = await readdir(this.getStorageDirectory());
    return songs;
  }
}
