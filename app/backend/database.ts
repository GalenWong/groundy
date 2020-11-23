/* eslint-disable no-underscore-dangle */

import Datastore from 'nedb-promises';
import Ajv from 'ajv';
import * as path from 'path';
import songSchema, { DbSong } from './schemas/songSchema';
import playlistSchema from './schemas/playlistSchema';
import { Song, Playlist, Token } from '../types/index';

export default class Database {
  private static instance: Database;

  private directory: string;

  private songSchemaValidator: Ajv.ValidateFunction;

  private playlistSchemaValidator: Ajv.ValidateFunction;

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
    return this.songSchemaValidator(data) as boolean;
  }

  async createSong(data: Song): Promise<DbSong> {
    const dbSong: DbSong = {
      ytid: data.ytID,
      title: data.title,
      channel: data.channel,
      fileName: data.fileName,
      downloaded: data.downloaded,
      thumbnailUrl: data.thumbnailUrl,
      key: 'song',
    };
    const isValid = this.validateSong(dbSong);
    const exist = (await this.getOneSong(data.ytID)) !== null;
    if (exist) {
      throw new Error(`duplicate song ${data.ytID}`);
    }
    if (isValid) {
      return this.db.insert(dbSong);
    }
    throw new Error('invalid song');
  }

  async getOneSong(ytid: string): Promise<Song | null> {
    const s = await this.db.findOne<DbSong>({ key: 'song', ytid });
    if (s !== null)
      return {
        ...s,
        ytID: s.ytid,
      };
    return null;
  }

  async deleteSong(ytid: string): Promise<void> {
    await this.db.remove({ ytid }, { multi: true });
  }

  async updateSong(ytid: string, data: Partial<Song>): Promise<void> {
    const found = this.db.findOne({ key: 'song', ytid });
    if (found === null) return;
    await this.db.update({ ytid }, { $set: data });
  }

  async getAllSongs(): Promise<Song[]> {
    const songs = await this.db.find<DbSong>({ key: 'song' });
    return songs.map((s) => ({
      ytID: s.ytid,
      title: s.title,
      channel: s.channel,
      downloaded: s.downloaded,
      fileName: s.fileName,
      thumbnailUrl: s.thumbnailUrl,
    }));
  }

  /// ////////////////////////////////////////
  // PLAYLIST DATABASE API
  /// ////////////////////////////////////////

  validatePlaylist(data: any): boolean {
    return this.playlistSchemaValidator(data) as boolean;
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
