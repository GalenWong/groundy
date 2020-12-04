import ytdl from 'ytdl-core';
import { Readable } from 'stream';
import { FinishCallback, ProgressCallback } from './types';
import SongStore from '../SongStore';

/**
 * A download manager class for a song
 * Using the Observer pattern
 * Each listener subscribed for a specific stage of downloading
 * like showing on the frontend or putting in the database
 */
export default class DownloadManager {
  /**
   * All subscribed Finish Listeners
   * waiting to be called back
   */
  private onFinishListeners: FinishCallback[] = [];

  /**
   * All subscribed Progress Listeners
   * waiting to be called back
   */
  private onProgressListeners: ProgressCallback[] = [];

  /**
   * ytid of a song
   */
  private ytid: string;

  /**
   * filename
   */
  private filename: string;

  private ytdlInst: Readable;

  /**
   * Subscribing a finish observer
   *
   * @param {FinishCallback} cb - A FinishCallback callback function
   * @returns {void} - void
   */
  public addOnFinishListener(cb: FinishCallback) {
    this.onFinishListeners.push(cb);
  }

  /**
   * Subscribing a progress observer
   *
   * @param {ProgressCallback} cb - A ProgressCallback callback function
   * @returns {void} - void
   */
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
    });
  }

  /**
   * notify all subscribed finish listeners
   *
   * @returns {void} - void
   */
  private notifyFinish() {
    this.onFinishListeners.forEach((f) =>
      f({ ytid: this.ytid, filename: this.filename })
    );
  }

  /**
   * notify all subscribed progress listeners
   *
   * @returns {void} - void
   */
  private notifyProgress(total: number, downloaded: number) {
    this.onProgressListeners.forEach((f) =>
      f({ ytid: this.ytid, filename: this.filename, total, downloaded })
    );
  }
}
