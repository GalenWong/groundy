/* eslint-disable no-underscore-dangle */

import Datastore from 'nedb-promises';
import Ajv from 'ajv';
import * as path from 'path';
import songSchema, { DbSong } from './schemas/songSchema';
import playlistSchema, {
  DbPlaylist,
  DbResolvedPlaylist,
} from './schemas/playlistSchema';
import { Song, Token } from '../../types/index';
import tokenSchema from './schemas/tokenSchema';

export default class Database {
  private static instance: Database;

  private directory: string;

  private songSchemaValidator: Ajv.ValidateFunction;

  private playlistSchemaValidator: Ajv.ValidateFunction;

  private tokenSchemaValidator: Ajv.ValidateFunction;

  private db: Datastore;

  private constructor(directory: string) {
    const ajv = new Ajv({ allErrors: true, useDefaults: true });

    this.songSchemaValidator = ajv.compile(songSchema);
    this.playlistSchemaValidator = ajv.compile(playlistSchema);
    this.tokenSchemaValidator = ajv.compile(tokenSchema);

    const databasePath = path.join(directory, 'database.db');
    this.directory = databasePath;

    this.db = Datastore.create({
      filename: databasePath,
      timestampData: true,
      autoload: true,
    });
  }

  static getInstance(directory?: string): Database {
    if (Database.instance) {
      return Database.instance;
    }

    if (!directory) {
      throw new Error('Directory cannot be empty.');
    }

    Database.instance = new Database(directory);

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

  async createPlaylist(name: string) {
    const playlist = {
      name,
      songs: [],
      key: 'playlist',
    };
    const isValid = this.validatePlaylist(playlist);

    if (isValid) {
      return this.db.insert(playlist);
    }
    return null;
  }

  async getOnePlaylist(id: string): Promise<DbResolvedPlaylist | null> {
    const entry = await this.db.findOne<DbPlaylist>({
      key: 'playlist',
      _id: id,
    });
    if (entry === null) return null;

    const songPromises = entry.songs.map((ytid) => this.getOneSong(ytid));
    const songs = await Promise.all(songPromises);
    if (songs.some((song) => song === null)) {
      throw new Error('playlist contains invalid songs');
    }

    return {
      id: entry._id,
      name: entry.name,
      songs: songs as Song[],
    };
  }

  async deletePlaylist(id: string): Promise<void> {
    await this.db.remove({ key: 'playlist', _id: id }, { multi: true });
  }

  async updatePlaylist(id: string, data: Partial<DbPlaylist>): Promise<void> {
    if (data.songs) {
      const songs = await Promise.all(
        data.songs.map((ytid) => this.getOneSong(ytid))
      );
      if (songs.some((v) => v === null)) {
        throw new Error('inserting non existing songs');
      }
    }
    await this.db.update({ key: 'playlist', _id: id }, { $set: data });
  }

  async getAllPlaylists(): Promise<DbResolvedPlaylist[]> {
    const playlists = await this.db.find({ key: 'playlist' });
    return Promise.all(
      playlists.map(
        (pl) => this.getOnePlaylist(pl._id) as Promise<DbResolvedPlaylist>
      )
    );
  }

  /// ////////////////////////////////////////
  // TOKEN DATABASE API
  /// ////////////////////////////////////////

  validateToken(data: any): boolean {
    return this.tokenSchemaValidator(data) as boolean;
  }

  async createToken(data: Token) {
    const record = {
      refresh_token: data.refresh_token,
      expiry_date: data.expiry_date,
      token_type: data.token_type,
      scope: data.scope,
      access_token: data.access_token,
      key: 'token',
    };
    const isValid = this.tokenSchemaValidator(record);
    if (!isValid) {
      throw new Error('invalid token detected');
    }
    const t = await this.db.insert(record);
    return t;
  }

  async getToken(): Promise<Token | null> {
    const t = await this.db.findOne<Token>({ key: 'token' });
    return t;
  }

  async deleteToken(): Promise<void> {
    await this.db.remove({ key: 'token' }, { multi: true });
  }
}
