import os from 'os';
import path from 'path';
import { promisify } from 'util';
import fs from 'fs';
import DownloaderManager from '../../../../app/backend/downloader/DownloadManager';

const fsAccess = promisify(fs.access);

describe('DownloaderManager', () => {
  test('can download one song', async () => {
    jest.setTimeout(60000);
    // this is a zero-second video
    const zeroSecondVideoId = 'TK4N5W22Gts';
    const tmpdir = os.tmpdir();
    const filepath = path.join(tmpdir, 'test-file.mp3');
    const inst = new DownloaderManager(zeroSecondVideoId, filepath, {
      filter: 'audioonly',
    });

    const endPromise = new Promise((resolve) => {
      inst.addOnFinishListener(({ ytid, filepath: cbFilePath }) => {
        expect(ytid).toBe(zeroSecondVideoId);
        expect(cbFilePath).toBe(filepath);
        resolve();
      });
    });

    await endPromise;

    await fsAccess(filepath, fs.constants.R_OK);
  });
});
