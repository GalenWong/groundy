import fs from 'fs';
import path from 'path';
import os from 'os';
import { promisify } from 'util';
import downloader from '../../../app/backend/downloader';
import SongStore from '../../../app/backend/SongStore';

const fsAccess = promisify(fs.access);

describe('Downloader', () => {
  /* this test requires internet connection */
  it('downloads one song', async () => {
    jest.setTimeout(60000);
    const videoId = 'TK4N5W22Gts';
    const tmpdir = os.tmpdir();
    SongStore.getInstance().setDirectory(tmpdir);
    const name = 'test-file-downloader-i-spec';

    const filename = await downloader.startDownload(videoId, name);
    expect(filename).toBe(`${name}-${videoId}.mp4`);

    // cannot start download twice
    await expect(downloader.startDownload(videoId, name)).rejects.toThrow();

    const endPromise = new Promise((resolve) => {
      downloader.addFinishDownloadListener(
        videoId,
        ({ ytid, filename: cbFilename }) => {
          expect(ytid).toBe(videoId);
          expect(cbFilename).toBe(filename);
          resolve();
        }
      );
    });

    const progressPromise = new Promise((resolve) => {
      downloader.addProgressListener(videoId, ({ ytid, total, downloaded }) => {
        expect(typeof total).toBe('number');
        expect(typeof downloaded).toBe('number');
        expect(ytid).toBe(videoId);
        resolve();
      });
    });

    await Promise.all([endPromise, progressPromise]);
    await fsAccess(path.join(tmpdir, filename), fs.constants.R_OK);
  });
});
