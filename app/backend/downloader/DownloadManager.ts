import ytdl from 'ytdl-core';
import fs from 'fs';
import { Readable } from 'stream';
import { FinishCallback, ProgressCallback } from './types';

export default class DownloadManager {
  private onFinishListeners: FinishCallback[] = [];

  private onProgressListeners: ProgressCallback[] = [];

  private ytid: string;

  private filepath: string;

  private ytdlInst: Readable;

  public addOnFinishListener(cb: FinishCallback) {
    this.onFinishListeners.push(cb);
  }

  public addOnProgressListener(cb: ProgressCallback) {
    this.onProgressListeners.push(cb);
  }

  constructor(ytid: string, filepath: string, options: ytdl.downloadOptions) {
    this.ytid = ytid;
    this.filepath = filepath;

    this.ytdlInst = ytdl(ytid, options);

    this.ytdlInst.pipe(fs.createWriteStream(this.filepath));
    this.ytdlInst.on(
      'progress',
      (_chunkLength: number, downloaded: number, total: number) => {
        this.notifyProgress(total, downloaded);
      }
    );

    this.ytdlInst.on('end', () => {
      this.notifyFinish();
    });
  }

  private notifyFinish() {
    this.onFinishListeners.forEach((f) =>
      f({ ytid: this.ytid, filepath: this.filepath })
    );
  }

  private notifyProgress(total: number, downloaded: number) {
    this.onProgressListeners.forEach((f) =>
      f({ ytid: this.ytid, filepath: this.filepath, total, downloaded })
    );
  }
}
