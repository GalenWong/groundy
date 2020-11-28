/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../../app/backend/database/index';
import { Song } from '../../../app/types/index';

import addSongToPlaylist from '../../../app/backend/ipc/addSongToPlaylist';
import deletePlaylist from '../../../app/backend/ipc/deletePlaylist';
import getAllDownloads from '../../../app/backend/ipc/getAllDownloads';
import getAllPlaylists from '../../../app/backend/ipc/getAllPlaylists';
import getPlaylistInfo from '../../../app/backend/ipc/getPlaylistInfo';
import newPlaylist from '../../../app/backend/ipc/newPlaylist';
import removeSongFromPlaylist from '../../../app/backend/ipc/removeSongFromPlaylist';

function getRand() {
  return Math.floor(Math.random() * 1000000);
}

describe('ipcPlaylist', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('ipcPlaylistIntegration', async () => {
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

    // newPlaylist IPC
    const myPlaylist1 = await newPlaylist('myPlaylist1');
    expect(myPlaylist1.id).toBeDefined();
    expect(myPlaylist1.name).toEqual('myPlaylist1');
    expect(myPlaylist1.songs).toHaveLength(0);

    const myPlaylist2 = await newPlaylist('myPlaylist2');
    expect(myPlaylist2.id).toBeDefined();
    expect(myPlaylist2.name).toEqual('myPlaylist2');
    expect(myPlaylist2.songs).toHaveLength(0);

    // addSongToPlaylist & getPlaylistInfo IPCs
    await addSongToPlaylist(song1.ytID, myPlaylist1.id);
    let p1 = await getPlaylistInfo(myPlaylist1.id);
    expect(p1.songs).toContainEqual(expect.objectContaining(song1));

    await addSongToPlaylist(song2.ytID, myPlaylist1.id);
    p1 = await getPlaylistInfo(myPlaylist1.id);
    expect(p1.songs).toContainEqual(expect.objectContaining(song2));

    await addSongToPlaylist(song2.ytID, myPlaylist2.id);
    const p2 = await getPlaylistInfo(myPlaylist2.id);
    expect(p2.songs).toContainEqual(expect.objectContaining(song2));

    let err;
    try {
      await addSongToPlaylist('dummySongId', myPlaylist1.id);
    } catch (e) {
      err = e;
    }
    expect(err).toEqual(new Error('song does not exist. songId = dummySongId'));

    try {
      await addSongToPlaylist(song1.ytID, 'dummyPlaylistId');
    } catch (e) {
      err = e;
    }
    expect(err).toEqual(
      new Error('playlist does not exist. playlistId = dummyPlaylistId')
    );

    // removeSongFromPlaylist IPC
    await removeSongFromPlaylist(song2.ytID, myPlaylist1.id);
    p1 = await getPlaylistInfo(myPlaylist1.id);
    expect(p1.songs).toContainEqual(expect.objectContaining(song1));
    expect(p1.songs).not.toContainEqual(expect.objectContaining(song2));

    try {
      await removeSongFromPlaylist('dummySongId', myPlaylist1.id);
    } catch (e) {
      err = e;
    }
    expect(err).toEqual(new Error('song does not exist. songId = dummySongId'));

    // getAllPlaylists & deletePlaylist IPCs
    let playlists = await getAllPlaylists();
    expect(playlists).toHaveLength(2);
    expect(playlists).toContainEqual(expect.objectContaining(p1));
    expect(playlists).toContainEqual(expect.objectContaining(p2));

    await deletePlaylist(p1.id);
    playlists = await getAllPlaylists();
    expect(playlists).toHaveLength(1);
    expect(playlists).not.toContainEqual(expect.objectContaining(p1));
    expect(playlists).toContainEqual(expect.objectContaining(p2));

    // getAllDownloads IPC
    const song3: Song = {
      ytID: `my_ytid_${getRand()}`,
      title: 'my_title_3',
      channel: 'my_channel_3',
      fileName: 'my_filename_3',
      thumbnailUrl: 'my_thumbnailUrl_3',
      downloaded: false,
    };
    const s3 = await database.createSong(song3);

    const song4: Song = {
      ytID: `my_ytid_${getRand()}`,
      title: 'my_title_4',
      channel: 'my_channel_4',
      fileName: 'my_filename_4',
      thumbnailUrl: 'my_thumbnailUrl_4',
      downloaded: true,
    };
    const s4 = await database.createSong(song4);

    const downloads = await getAllDownloads();
    expect(downloads).toHaveLength(3);
    expect(downloads).not.toContainEqual(expect.objectContaining(song3));
    expect(downloads).toContainEqual(expect.objectContaining(song1));
    expect(downloads).toContainEqual(expect.objectContaining(song2));
    expect(downloads).toContainEqual(expect.objectContaining(song4));
  });
});
