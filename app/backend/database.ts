/* eslint-disable no-underscore-dangle */

import * as path from 'path';
import songSchema from './schemas/songSchema';
import playlistSchema from './schemas/playlistSchema';
// import { Song, Playlist, Token } from '../types/index';

const Datastore = require('nedb-promises');
const Ajv = require('ajv');

export default class Database {
  private static instance: Database;

  private directory: string;

  private songSchemaValidator: any;

  private playlistSchemaValidator: any;

  private db: Datastore;

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
  validateSong(data: any): boolean {
    return this.songSchemaValidator(data);
  }

  async createSong(data: any): Promise<any> | null {
    const isValid = this.validateSong(data);
    if (isValid) {
      data.key = 'song';
      const s = await this.db.insert(data);
      return s;
    }
    return null;
  }

  async getOneSong(ytid: string): Promise<any> | null {
    const s = await this.db.findOne({ key: 'song', ytid }).exec();
    return s === null ? null : s;
  }

  async deleteSong(ytid: string): Promise<void> {
    await this.db.remove({ ytid });
  }

  async updateSong(ytid: string, data: any): Promise<void> {
    const found = this.db.findOne({ key: 'song', ytid });
    if (found === null) return;
    await this.db.update({ ytid }, { $set: data });
  }

  async getAllSongs(): Promise<any> {
    const songs = await this.db.find({ key: 'song' });
    return songs;
  }

  /// ////////////////////////////////////////
  // PLAYLIST DATABASE API
  /// ////////////////////////////////////////

  validatePlaylist(data: any): boolean {
    return this.playlistSchemaValidator(data);
  }

  async createPlaylist(data: any): Promise<any> {
    const isValid = this.validatePlaylist(data);
    if (isValid) {
      // assume ytid for each song is valid
      // call findOneSong() before adding to songs[]

      data.key = 'playlist';
      let p = await this.db.insert(data);
      await this.db.update({ _id: p._id }, { $set: { id: p._id } });
      p = await this.db.findOne({ _id: p._id });
      return p;
    }
    return null;
  }

  async getOnePlaylist(id: string): Promise<any> {
    const p = await this.db.findOne({ key: 'playlist', id }).exec();
    return p;
  }

  async deletePlaylist(id: string): Promise<void> {
    await this.db.remove({ key: 'playlist', id });
  }

  async updatePlaylist(id: string, data: any): Promise<void> {
    await this.db.update({ key: 'playlist', id }, { $set: data });
  }

  async getAllPlaylists(): Promise<any> {
    const playlists = await this.db.find({ key: 'playlist' });
    return playlists;
  }

  /// ////////////////////////////////////////
  // TOKEN DATABASE API
  /// ////////////////////////////////////////
  async createToken(data: any): Promise<any> {
    data.key = 'token';
    const t = await this.db.insert(data);
    return t;
  }

  async getToken(id_token: string): Promise<any> {
    const t = await this.db.findOne({ key: 'token', id_token }).exec();
    return t;
  }

  async updateToken(id_token: string, data: any): Promise<void> {
    await this.db.update({ key: 'token', id_token }, { $set: data });
  }
}
