import Database from '../database/index';
import { Song, Playlist } from '../../types/index';

/**
 * A Singleton class used to manage playlists
 */
export default class PlaylistModule {
  /**
   * Using the only database instance
   */
  private database: Database;

  /**
   * Get the instance
   */
  constructor() {
    this.database = Database.getExistingInstance();
  }

  /**
   * Add a song to a local playlist
   *
   * @async
   * @param {string} songID - id of a song
   * @param {string} playlistID - id of a local playlist
   * @returns {Promise<void>} - void
   */
  async addSong(songId: string, playlistId: string): Promise<void> {
    const song = await this.database.getOneSong(songId);
    const playlist = await this.database.getOnePlaylist(playlistId);

    if (!song) throw new Error(`song does not exist. songId = ${songId}`);
    if (!playlist)
      throw new Error(`playlist does not exist. playlistId = ${playlistId}`);

    const songIdArr = playlist.songs.map((s) => s.ytID);
    if (songIdArr.includes(songId)) {
      throw new Error(
        `song ${songId} ${song.title} already exists in playlist ${playlist.id} ${playlist.name}`
      );
    }
    songIdArr.push(songId);
    await this.database.updatePlaylist(playlistId, { songs: songIdArr });
  }

  /**
   * Remove a song from a local playlist
   *
   * @async
   * @param {string} songID - id of a song
   * @param {string} playlistID - id of a local playlist
   * @returns {Promise<void>} - void
   */
  async removeSong(songId: string, playlistId: string): Promise<void> {
    const song = await this.database.getOneSong(songId);
    const playlist = await this.database.getOnePlaylist(playlistId);

    if (!song) throw new Error(`song does not exist. songId = ${songId}`);
    if (!playlist)
      throw new Error(`playlist does not exist. playlistId = ${playlistId}`);

    const songIdArr = playlist.songs
      .filter((s) => s.ytID !== songId)
      .map((s) => s.ytID);
    await this.database.updatePlaylist(playlistId, { songs: songIdArr });
  }

  /**
   * Create a new local playlist
   *
   * @async
   * @param {string} name - name of the new playlist
   * @returns {Promise<Playlist>} - Promise that resolves to a Playlist
   */
  async createPlaylist(name: string): Promise<Playlist> {
    const p = await this.database.createPlaylist(name);
    return {
      id: p?._id,
      name: p?.name,
      songs: [] as Song[],
    } as Playlist;
  }

  /**
   * Get info of a playlist
   *
   * @async
   * @param {string} playlistID - the unique ID of a local playlist
   * @returns {Promise<Playlist>} - Promise that resolves to a Playlist
   */
  async getPlaylist(id: string): Promise<Playlist> {
    const p = await this.database.getOnePlaylist(id);
    if (!p) throw new Error(`playlist does not exist with id = ${id}`);
    return p as Playlist;
  }

  /**
   * Get all local playlists
   *
   * @async
   * @returns {Promise<Playlist[]>} - Promise that resolves to an array of local playlists
   */
  async getAllPlaylists(): Promise<Playlist[]> {
    const p = await this.database.getAllPlaylists();
    return p as Playlist[];
  }

  /**
   * Delete a local playlist
   *
   * @async
   * @param {string} playlistID - id of a local playlist
   * @returns {Promise<void>} - Promise that resolves to void
   */
  async removePlaylist(id: string): Promise<void> {
    await this.database.deletePlaylist(id);
  }

  /**
   * Rename a playlist
   * @async
   * @param {string} playlistId - id of the renaming list
   * @param {string} name - new name'
   * @return {Promise<void>} - Promise that resolves to void
   */
  async renamePlaylist(id: string, name: string) {
    const playlist = await this.database.getOnePlaylist(id);
    if (!playlist)
      throw new Error(`playlist does not exist. playlistId = ${id}`);
    await this.database.updatePlaylist(id, { name });
  }
}
