import os from 'os';
import path from 'path';
import { promisify } from 'util';
import fs from 'fs';
import DownloaderManager from '../../../app/backend/downloader/DownloadManager';
import SongStore from '../../../app/backend/SongStore';

const fsAccess = promisify(fs.access);

describe('DownloaderManager', () => {
  /* this test requires internet connection */
  test('can download one song', async () => {
    jest.setTimeout(60000);
    // this is a short video
    const videoId = 'TK4N5W22Gts';
    const tmpdir = os.tmpdir();
    SongStore.getInstance().setDirectory(tmpdir);
    const name = 'test-file.mp3';
    const inst = new DownloaderManager(videoId, name, {
      filter: 'audioonly',
    });

    const endPromise = new Promise((resolve) => {
      inst.addOnFinishListener(({ ytid, filename }) => {
        expect(ytid).toBe(videoId);
        expect(filename).toBe(name);
        resolve();
      });
    });

    const progressPromise = new Promise((resolve) => {
      inst.addOnProgressListener(({ ytid, total, downloaded }) => {
        expect(typeof total).toBe('number');
        expect(typeof downloaded).toBe('number');
        expect(ytid).toBe(videoId);
        resolve();
      });
    });

    await Promise.all([endPromise, progressPromise]);

    await fsAccess(path.join(tmpdir, name), fs.constants.R_OK);
  });
});
