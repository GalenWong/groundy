const fs = require('fs'); 
const path = require('path'); 

export class SongStore {
  private static instance: SongStore; 
  
  storageDirectory: string; 

  private constructor(storageDirectory: string) {
    this.storageDirectory = storageDirectory; 
  }

  static getInstance(storageDirectory: string): SongStore {
    if (!SongStore.instance) {
      if (!storageDirectory) {
        throw new Error('Invalid argument: storageDirectory');
      }
      SongStore.instance = new SongStore(storageDirectory);
    }
    return SongStore.instance; 
  }

  getWriteStream(nameOfFile: string): any {
    const filePath = path.join(this.storageDirectory, nameOfFile);
    try {
      if (fs.existsSync(filePath)) {
        return fs.createWriteStream(filePath);
      }
    } catch (err) {
      console.log(err); 
    }
  }

  delete(nameOfFile: string): void {
    const filePath = path.join(this.storageDirectory, nameOfFile);  
    if (this.doesFileExists(filePath)) {
      throw new Error('Invalid argument: nameOfFile');
    }

    fs.unlink(filePath, (err: any) => {
      if (err) throw err; 
    })
  }

  getStorageDirectory(): string {
    return this.storageDirectory; 
  }

  doesFileExists(nameOfFile: string): boolean {
    let filePath = path.join(this.storageDirectory, nameOfFile); 
    return fs.existsSync(filePath); 
  }

  getAllSongs(): any {
    fs.readdir(this.storageDirectory, (err: any, files: any) => {
      if (err) {
        console.log(err); 
      }
      return files; 
    });
  }
}

