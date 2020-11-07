const fs = require('fs');
const path = require('path');

export class SongStore {
  private static instance: SongStore;

  private storageDirectory: string;

  private constructor(storageDirectory: string) {
    this.storageDirectory = storageDirectory;
  }

  static getInstance(storageDirectory: string): SongStore {
    if (!SongStore.instance) {
      SongStore.instance = new SongStore(storageDirectory);
    }
    return SongStore.instance;
  }

  getWriteStream(nameOfFile: string): any {
    if (!this.storageDirectory) this.storageDirectory = process.cwd();
    const filePath = path.join(this.storageDirectory, nameOfFile);
    return fs.createWriteStream(filePath);
  }

  async delete(nameOfFile: string): any {
    const filePath = path.join(this.storageDirectory, nameOfFile);
    await fs.unlink(filePath);
  }

  getStorageDirectory(): string {
    return this.storageDirectory;
  }

  async getAllSongs(): any {
    return await fs.readdir(this.storageDirectory);
  }
}
