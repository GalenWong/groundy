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

/**
 * A singleton class handling all communications to the database
 */
export default class Database {
  /**
   * The instance of the class
   */
  private static instance: Database;

  private directory: string;

  /**
   * Validate song schema
   */
  private songSchemaValidator: Ajv.ValidateFunction;

  /**
   * Validate playlist schema
   */
  private playlistSchemaValidator: Ajv.ValidateFunction;

  /**
   * Validate token schema
   */
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

  /**
   * TO get the instance
   */
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

  /**
   * Used for Playlist Module only
   * Assume the instance already exist
   */
  static getExistingInstance(): Database {
    return Database.instance;
  }

  /**
   * For testing only
   */
  getDirectory(): string {
    return this.directory;
  }

  /// ////////////////////////////////////////
  // SONG DATABASE API
  /// ////////////////////////////////////////

  /**
   * Validate the schema of a song
   *
   * @param {any} data - the song
   * @returns {Promise<boolean>} - valid or not
   */
  validateSong(data: any): boolean {
    return this.songSchemaValidator(data) as boolean;
  }

  /**
   * Create a song in the db
   *
   * @async
   * @param {Song} data - the to be createdSong
   * @returns {Promise<DbSong>} - the created song
   */
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

  /**
   * Get a song from the db
   *
   * @async
   * @param {string} ytid - the ytid of the song
   * @returns {Promise<Song | null>} - the required song or null if couldn't find one
   */
  async getOneSong(ytid: string): Promise<Song | null> {
    const s = await this.db.findOne<DbSong>({ key: 'song', ytid });
    if (s !== null)
      return {
        ...s,
        ytID: s.ytid,
      };
    return null;
  }

  /**
   * Delete a song from the db
   *
   * @async
   * @param {string} ytid - the ytid of the song
   * @returns {Promise<void>} - void
   */
  async deleteSong(ytid: string): Promise<void> {
    await this.db.remove({ ytid }, { multi: true });
  }

  /**
   * Update a song in the db
   *
   * @async
   * @param {string} ytid - the ytid of the song
   * @param {Partial<Song>} data - updatedsong
   * @returns {Promise<void>} - void
   */
  async updateSong(ytid: string, data: Partial<Song>): Promise<void> {
    const found = this.db.findOne({ key: 'song', ytid });
    if (found === null) return;
    await this.db.update({ ytid }, { $set: data });
  }

  /**
   * Get all songs in the db
   *
   * @async
   * @returns {Promise<Song[]>} - An array containing all songs in the db
   */
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

  /**
   * Validate the schema of a playlist
   *
   * @param {any} data - the playlist
   * @returns {Promise<boolean>} - valid or not
   */
  validatePlaylist(data: any): boolean {
    return this.playlistSchemaValidator(data) as boolean;
  }

  /**
   * Create a playlist in the db
   *
   * @async
   * @param {string} name - name of the playlist
   * @returns - the created playlist
   */
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

  /**
   * Get a playlist from the db
   *
   * @async
   * @param {string} id - the ytid of the playlist
   * @returns {Promise<DbResolvedPlaylist | null>} - the required playlist or null if couldn't find one
   */
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

  /**
   * Get a playlist from the db
   *
   * @async
   * @param {string} id - the ytid of the playlist
   * @returns {Promise<void>} - void
   */
  async deletePlaylist(id: string): Promise<void> {
    await this.db.remove({ key: 'playlist', _id: id }, { multi: true });
  }

  /**
   * Get a playlist from the db
   *
   * @async
   * @param {string} id - the ytid of the playlist
   * @param {Partial<DbPlaylist>} data - the updated playlist
   * @returns {Promise<void>} - void
   */
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

  /**
   * Get all playlists in the db
   *
   * @async
   * @returns {Promise<DbResolvedPlaylist[]>} - An array of all playlists in the db
   */
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

  /**
   * Validate the schema of a token
   *
   * @param {any} data - the token
   * @returns {Promise<boolean>} - valid or not
   */
  validateToken(data: any): boolean {
    return this.tokenSchemaValidator(data) as boolean;
  }

  /**
   * Create a token
   *
   * @async
   * @param {Token} data - the created token
   * @returns - the created token
   */
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

  /**
   * Get current user's token
   *
   * @async
   * @returns {Promise<Token | null>} - the token or null if couldn't find one
   */
  async getToken(): Promise<Token | null> {
    const t = await this.db.findOne<Token>({ key: 'token' });
    return t;
  }

  /**
   * Delete current user's token
   *
   * @async
   * @returns {Promise<void>} - void
   */
  async deleteToken(): Promise<void> {
    await this.db.remove({ key: 'token' }, { multi: true });
  }
}
