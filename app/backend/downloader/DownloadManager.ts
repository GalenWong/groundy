import ytdl from 'ytdl-core';
import { Readable } from 'stream';
import { FinishCallback, ProgressCallback } from './types';
import SongStore from '../SongStore';

export default class DownloadManager {
  private onFinishListeners: FinishCallback[] = [];

  private onProgressListeners: ProgressCallback[] = [];

  private ytid: string;

  private filename: string;

  private ytdlInst: Readable;

  public addOnFinishListener(cb: FinishCallback) {
    this.onFinishListeners.push(cb);
  }

  public addOnProgressListener(cb: ProgressCallback) {
    this.onProgressListeners.push(cb);
  }

  constructor(ytid: string, filename: string, options: ytdl.downloadOptions) {
    this.ytid = ytid;
    this.filename = filename;

    this.ytdlInst = ytdl(ytid, options);

    this.ytdlInst.pipe(SongStore.getInstance().getWriteStream(filename));
    this.ytdlInst.on(
      'progress',
      (_chunkLength: number, downloaded: number, total: number) => {
        this.notifyProgress(total, downloaded);
      }
    );

    this.ytdlInst.on('end', () => {
      this.notifyFinish();
      this.notifyProgress(100, 100);
    });
  }

  private notifyFinish() {
    this.onFinishListeners.forEach((f) =>
      f({ ytid: this.ytid, filename: this.filename })
    );
  }

  private notifyProgress(total: number, downloaded: number) {
    this.onProgressListeners.forEach((f) =>
      f({ ytid: this.ytid, filename: this.filename, total, downloaded })
    );
  }
}
