import Database from '../database/index';
import { Song, Playlist } from '../../types/index';

export default class PlaylistModule {
  private database: Database;

  constructor() {
    this.database = Database.getExistingInstance();
  }

  async addSong(songId: string, playlistId: string): Promise<void> {
    const song = await this.database.getOneSong(songId);
    const playlist = await this.database.getOnePlaylist(playlistId);

    if (!song) throw new Error(`song does not exist. songId = ${songId}`);
    if (!playlist)
      throw new Error(`playlist does not exist. playlistId = ${playlistId}`);

    const songIdArr = playlist.songs.map((s) => s.ytID);
    songIdArr.push(songId);
    await this.database.updatePlaylist(playlistId, { songs: songIdArr });
  }

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

  async createPlaylist(name: string): Promise<Playlist> {
    const p = await this.database.createPlaylist(name);
    return {
      id: p?._id,
      name: p?.name,
      songs: [] as Song[],
    } as Playlist;
  }

  async getPlaylist(id: string): Promise<Playlist> {
    const p = await this.database.getOnePlaylist(id);
    if (!p) throw new Error(`playlist does not exist with id = ${id}`);
    return p as Playlist;
  }

  async getAllPlaylists(): Promise<Playlist[]> {
    const p = await this.database.getAllPlaylists();
    return p as Playlist[];
  }

  async removePlaylist(id: string): Promise<void> {
    await this.database.deletePlaylist(id);
  }
}
