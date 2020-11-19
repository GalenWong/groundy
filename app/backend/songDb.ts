import * as path from 'path';
import songSchema from './songSchema';

const Datastore = require('nedb-promises');
const Ajv = require('ajv');

export default class SongDb {
  private directory: string;

  private static instance: SongDb;

  private constructor(directory: string) {
    const ajv = new Ajv({ allErrors: true, useDefaults: true });
    this.schemaValidator = ajv.compile(songSchema);

    const songDbPath = path.join(directory, 'song.db');
    this.directory = songDbPath;

    this.db = Datastore.create({
      filename: songDbPath,
      timestampData: true,
      autoload: true,
    });
  }

  static getInstance(directory: string): SongDb {
    if (directory === '') {
      throw new Error('Directory cannot be empty.');
    }

    if (!SongDb.instance) {
      SongDb.instance = new SongDb(directory);
    }

    return SongDb.instance;
  }

  // For testing only
  getDirectory(): string {
    return this.directory;
  }
  /// /////////////////////

  validate(data): boolean {
    return this.schemaValidator(data);
  }

  async createSong(data: any): any {
    const isValid = this.validate(data);
    if (isValid) {
      const s = await this.db.insert(data);
      return s;
    }
    return null;
  }

  async getOneSong(ytid: string): any {
    const s = await this.db.findOne({ ytid }).exec();
    return s;
  }

  async getAllSongs() {
    const songs = await this.db.find({});
    const s = await songs.toArray();
    return s;
  }
}
