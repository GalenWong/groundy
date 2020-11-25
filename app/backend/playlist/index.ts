// //import Playlist from '../../components/Playlist';
// import { Song, Playlist } from '../../types/index';
// import Database from '../database/index';
// import { DbResolvedPlaylist } from '../database/schemas/playlistSchema';
// //import { DbPlaylist } from '../database/schemas/playlistSchema';
// import playlistSchema, {
//   DbPlaylist,
//   DbResolvedPlaylist,
// } from './schemas/playlistSchema';

import Database from '../database/index';
import { Song, Playlist } from '../../types/index';

export default class PlaylistModule {
  private database: Database;

  constructor(directory: string) {
    this.database = Database.getInstance(directory);
  }

  async addSong(song: Song, playlist: Playlist): Promise<void> {
    const found = await this.database.getOneSong(song.ytID);
    if (found) {
      playlist.songs.push(song);
      const songIdPromises = playlist.songs.map((s) => s.ytID);
      const songIdArr = await Promise.all(songIdPromises);
      await this.database.updatePlaylist(playlist.id, { songs: songIdArr });
    }
  }

  async removeSong(song: Song, playlist: Playlist): Promise<void> {
    const found = await this.database.getOneSong(song.ytID);
    if (found) {
      const songPromises = playlist.songs.filter((s) => s.ytID !== song.ytID);
      const songs = await Promise.all(songPromises);
      playlist.songs = songs;

      const songIdPromises = songs.map((s) => s.ytID);
      const songIdArr = await Promise.all(songIdPromises);
      await this.database.updatePlaylist(playlist.id, { songs: songIdArr });
    }
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
