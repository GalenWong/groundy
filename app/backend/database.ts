/* eslint-disable no-underscore-dangle */
import * as path from 'path';
import songSchema from './schemas/songSchema';
import playlistSchema from './schemas/playlistSchema';

const Datastore = require('nedb-promises');
const Ajv = require('ajv');

export default class Database {
  private directory: string;

  private static instance: Database;

  private constructor(directory: string) {
    const ajv = new Ajv({ allErrors: true, useDefaults: true });

    this.songSchemaValidator = ajv.compile(songSchema);
    this.playlistSchemaValidator = ajv.compile(playlistSchema);

    const databasePath = path.join(directory, 'database.db');
    this.directory = databasePath;

    this.db = Datastore.create({
      filename: databasePath,
      timestampData: true,
      autoload: true,
    });
  }

  static getInstance(directory: string): Database {
    if (directory === '') {
      throw new Error('Directory cannot be empty.');
    }

    if (!Database.instance) {
      Database.instance = new Database(directory);
    }

    return Database.instance;
  }

  // For testing only
  getDirectory(): string {
    return this.directory;
  }

  /// ////////////////////////////////////////
  // SONG DATABASE API
  /// ////////////////////////////////////////
  validateSong(data): boolean {
    return this.songSchemaValidator(data);
  }

  async createSong(data): Promise<> {
    const isValid = this.validateSong(data);
    if (isValid) {
      const s = await this.db.insert(data);
      return s;
    }
    return null;
  }

  async getOneSong(ytid: string): Promises<> {
    const s = await this.db.findOne({ key: 'song', ytid }).exec();
    return s;
  }

  async deleteSong(_id: string): void {
    await this.db.remove({ _id });
  }

  async updateSong(_id: string, data): void {
    await this.db.update({ _id }, { $set: data });
  }

  async getAllSongs(): Promise<> {
    const songs = await this.db.find({ key: 'song' });
    return songs;
  }

  /// ////////////////////////////////////////
  // PLAYLIST DATABASE API
  /// ////////////////////////////////////////

  validatePlaylist(data): boolean {
    return this.playlistSchemaValidator(data);
  }

  async createPlaylist(data): Promise<> {
    const isValid = this.validatePlaylist(data);
    if (isValid) {
      const p = await this.db.insert(data);
      return p;
    }
    return null;
  }

  async getOnePlaylist(id: string): Promise<> {
    const p = await this.db.findOne({ key: 'playlist', id }).exec();
    return p;
  }

  async deletePlaylist(_id: string): void {
    await this.db.remove({ _id });
  }

  async updatePlaylist(_id: string, data): void {
    await this.db.update({ _id }, { $set: data });
  }

  async getAllPlaylists(): Promise<> {
    const playlists = await this.db.find({ key: 'playlist' });
    return playlists;
  }

  /// ////////////////////////////////////////
  // TOKEN DATABASE API
  /// ////////////////////////////////////////
  async createToken(data): Promise<> {
    const t = await this.db.insert(data);
    return t;
  }

  async getOneToken(id_token: string): Promise<> {
    const t = await this.db.findOne({ key: 'token', id_token }).exec();
    return t;
  }

  async deleteToken(_id: string): void {
    await this.db.remove({ _id });
  }

  async updateToken(_id: string, data): void {
    await this.db.update({ _id }, { $set: data });
  }

  async getAllTokens(): Promise<> {
    const tokens = await this.db.find({ key: 'token' });
    return tokens;
  }
}
