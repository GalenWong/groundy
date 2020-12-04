import sanitize from 'sanitize-filename';
import ytdl from 'ytdl-core';
import DownloadManager from './DownloadManager';
import { FinishCallback, ProgressCallback } from './types';

/**
 * A singleton class that handles downloading
 * and tracking download progress
 */
class Downloader {
  /**
   * Mapping from a song to its DownloadManager
   *
   */
  private managers: Map<string, DownloadManager> = new Map();

  /**
   * Try to get a song's DownloadManager
   *
   * @param {string} ytid - ytid of asong
   * @returns {DownloadManager} - DownloadManager for the required song id
   */
  private getOrThrow(ytid: string): DownloadManager {
    const inst = this.managers.get(ytid);
    if (inst === undefined) {
      throw new Error(`cannot find download with instance ${ytid}`);
    }
    return inst;
  }

  /**
   * Handle the downloading of a file
   *
   * @async
   * @param {string} ytid - ytid of a song
   * @param {string} name - filename
   * @returns {Promise<String>} - the downloaded filename
   */
  public async startDownload(ytid: string, name: string): Promise<string> {
    if (this.managers.has(ytid)) {
      throw new Error(`already downloading ${ytid}`);
    }
    if (!ytdl.validateID(ytid)) {
      throw new Error(`invalid ytid: ${ytid}`);
    }
    const videoInfo = await ytdl.getInfo(ytid);
    const audioFormat = ytdl.chooseFormat(videoInfo.formats, {
      filter: 'audioonly',
    });

    const filename = sanitize(`${name}-${ytid}.${audioFormat.container}`);

    const manager = new DownloadManager(ytid, filename, {
      format: audioFormat,
    });
    this.managers.set(ytid, manager);
    // delete itself
    manager.addOnFinishListener(({ ytid: finishedYtid }) => {
      this.managers.delete(finishedYtid);
    });
    return filename;
  }

  /**
   * Subscribing a finish observer for a song
   *
   * @param {string} ytid - ytid of a song
   * @param {FinishCallback} onFinish - A FinishCallback callback function
   * @returns {void} - void
   */
  public addFinishDownloadListener(ytid: string, onFinish: FinishCallback) {
    const inst = this.getOrThrow(ytid);
    inst.addOnFinishListener(onFinish);
  }

  /**
   * Subscribing a progress observer for a song
   *
   * @param {string} ytid - ytid of a song
   * @param {ProgressCallback} onProgress - A ProgressCallback callback function
   * @returns {void} - void
   */
  public addProgressListener(ytid: string, onProgress: ProgressCallback) {
    const inst = this.getOrThrow(ytid);
    inst.addOnProgressListener(onProgress);
  }
}

const downloader = new Downloader();

/**
 * Export this instance as a singleton instance
 */
export default downloader;
