import * as os from 'os';
import * as path from 'path';
import SongDB from '../../app/backend/SongDB';

describe('songDb', () => {
  it('createSong', async () => {
    const tempDir = os.tmpdir();
    const songDb = SongDB.getInstance(tempDir);

    const data = {
      ytid: 'my_ytid_1',
      title: 'my_title_1',
      channel: 'my_channel_1',
      fileName: 'my_filename_1',
      thumbnailUrl: 'my_thumbnailUrl_1',
    };

    const s = await songDb.createSong(data);
    expect(s.ytid).toEqual('my_ytid_1');
    expect(s.title).toEqual('my_title_1');
    expect(s.channel).toEqual('my_channel_1');
    expect(s.fileName).toEqual('my_filename_1');
    expect(s.thumbnailUrl).toEqual('my_thumbnailUrl_1');
  });

  it('getOneSong', async () => {
    const tempDir = os.tmpdir();
    const songDb = SongDB.getInstance(tempDir);

    const data = {
      ytid: 'my_ytid_2',
      title: 'my_title_2',
      channel: 'my_channel_2',
      fileName: 'my_filename_2',
      thumbnailUrl: 'my_thumbnailUrl_2',
    };

    const s = await songDb.createSong(data);
    const result = await songDb.getOneSong('my_ytid_2');
    expect(result.ytid).toEqual('my_ytid_2');
    expect(result.title).toEqual('my_title_2');
    expect(result.channel).toEqual('my_channel_2');
    expect(result.fileName).toEqual('my_filename_2');
    expect(result.thumbnailUrl).toEqual('my_thumbnailUrl_2');
  });

  // it('getAllSongs', async () => {
  //   const tempDir = os.tmpdir();
  //   const songDb = SongDB.getInstance(tempDir);

  //   const data = {
  //     ytid: 'my_ytid_3',
  //     title: 'my_title_3',
  //     channel: 'my_channel_3',
  //     fileName: 'my_filename_3',
  //     thumbnailUrl: 'my_thumbnailUrl_3'
  //   };

  //   const s = await songDb.createSong(data);
  //   let result = await songDb.getAllSongs();
  //   console.log(typeof(result))
  //   //result = result.toArray();
  //   //expect(result).toEqual(expect.arrayContaining(s));
  // });
});
