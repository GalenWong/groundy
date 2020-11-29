/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../../app/backend/database/index';
import { Song } from '../../../app/types/index';
import PlaylistModule from '../../../app/backend/playlist';

import addSongToPlaylist from '../../../app/backend/ipc/addSongToPlaylist';

function getRand() {
  return Math.floor(Math.random() * 10000);
}

describe('ipc', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('addSongToPlaylist', async () => {
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

    // Create Playlist
    const playlistModule = new PlaylistModule();
    const myPlaylist1 = await playlistModule.createPlaylist('myPlaylist1');
    expect(myPlaylist1.id).toBeDefined();
    expect(myPlaylist1.name).toEqual('myPlaylist1');
    expect(myPlaylist1.songs).toHaveLength(0);

    // addSongToPlaylist
    await addSongToPlaylist(song1.ytID, myPlaylist1.id);
    const p1 = await playlistModule.getPlaylist(myPlaylist1.id);
    expect(p1.songs).toContainEqual(expect.objectContaining(song1));

    let error1;
    try {
      await addSongToPlaylist('dummyId', myPlaylist1.id);
    } catch (e) {
      error1 = e;
    }
    expect(error1).toEqual(new Error('song does not exist. songId = dummyId'));

    let error2;
    try {
      await addSongToPlaylist(song1.ytID, 'dummyPlaylist');
    } catch (e) {
      error2 = e;
    }
    expect(error2).toEqual(
      new Error('playlist does not exist. playlistId = dummyPlaylist')
    );
  });
});
