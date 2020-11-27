/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../../../app/backend/database';
import { Song, Playlist } from '../../../../app/types/index';
import PlaylistModule from '../../../../app/backend/playlist/index';

function getRand() {
  return Math.floor(Math.random() * 10000);
}

describe('playlistModule', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('playlistModuleIntegration', async () => {
    
    // Create database
    const database = Database.getInstance(tempDir);

    const song1: Song = {
      ytID: `my_ytid_${getRand()}`,
      title: 'my_title_1',
      channel: 'my_channel_1',
      fileName: 'my_filename_1',
      thumbnailUrl: 'my_thumbnailUrl_1',
      downloaded: true,
    };
    const s1 = await database.createSong(song1);
    expect(s1.ytid).toEqual(song1.ytID);
    expect(s1.title).toEqual('my_title_1');
    expect(s1.channel).toEqual('my_channel_1');
    expect(s1.fileName).toEqual('my_filename_1');
    expect(s1.thumbnailUrl).toEqual('my_thumbnailUrl_1');

    const song2: Song = {
      ytID: `my_ytid_${getRand()}`,
      title: 'my_title_2',
      channel: 'my_channel_2',
      fileName: 'my_filename_2',
      thumbnailUrl: 'my_thumbnailUrl_2',
      downloaded: true,
    };
    const s2 = await database.createSong(song2);
    expect(s2.ytid).toEqual(song2.ytID);
    expect(s2.title).toEqual('my_title_2');
    expect(s2.channel).toEqual('my_channel_2');
    expect(s2.fileName).toEqual('my_filename_2');
    expect(s2.thumbnailUrl).toEqual('my_thumbnailUrl_2');

    // Create Playlist
    const playlistModule = new PlaylistModule();
    const myPlaylist1 = await playlistModule.createPlaylist('myPlaylist1');
    expect(myPlaylist1.id).toBeDefined();
    expect(myPlaylist1.name).toEqual('myPlaylist1');
    expect(myPlaylist1.songs).toHaveLength(0);

    const myPlaylist2 = await playlistModule.createPlaylist('myPlaylist2');
    expect(myPlaylist2.id).toBeDefined();
    expect(myPlaylist2.name).toEqual('myPlaylist2');
    expect(myPlaylist2.songs).toHaveLength(0);

    // Add songs to Playlist & get Playlist
    await playlistModule.addSong(song1.ytID, myPlaylist1.id);
    let p1 = await playlistModule.getPlaylist(myPlaylist1.id);
    expect(p1.songs).toContainEqual(expect.objectContaining(song1));

    await playlistModule.addSong(song2.ytID, myPlaylist1.id);
    p1 = await playlistModule.getPlaylist(myPlaylist1.id);
    expect(p1.songs).toContainEqual(expect.objectContaining(song2));

    await playlistModule.addSong(song2.ytID, myPlaylist2.id);
    const p2 = await playlistModule.getPlaylist(myPlaylist2.id);
    expect(p2.songs).toContainEqual(expect.objectContaining(song2));

    // Remove song from Playlist
    await playlistModule.removeSong(song2.ytID, myPlaylist1.id);
    p1 = await playlistModule.getPlaylist(myPlaylist1.id);
    expect(p1.songs).toContainEqual(expect.objectContaining(song1));
    expect(p1.songs).not.toContainEqual(expect.objectContaining(song2));

    // get all Playlists & remove Playlist
    let playlists = await playlistModule.getAllPlaylists();
    expect(playlists).toHaveLength(2);
    expect(playlists).toContainEqual(expect.objectContaining(p1));
    expect(playlists).toContainEqual(expect.objectContaining(p2));

    await playlistModule.removePlaylist(p1.id);
    playlists = await playlistModule.getAllPlaylists();
    expect(playlists).toHaveLength(1);
    expect(playlists).not.toContainEqual(expect.objectContaining(p1));
    expect(playlists).toContainEqual(expect.objectContaining(p2));
  });
});
