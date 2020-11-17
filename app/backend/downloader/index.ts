import ytdl from 'ytdl-core';
import DownloadManager from './DownloadManager';
import { FinishCallback, ProgressCallback } from './types';

class Downloader {
  private managers: Map<string, DownloadManager> = new Map();

  private getOrThrow(ytid: string): DownloadManager {
    const inst = this.managers.get(ytid);
    if (inst === undefined) {
      throw new Error(`cannot find download with instance ${ytid}`);
    }
    return inst;
  }

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

    const filename = `${name}.${audioFormat.container}`;

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

  public addFinishDownloadListener(ytid: string, onFinish: FinishCallback) {
    const inst = this.getOrThrow(ytid);
    inst.addOnFinishListener(onFinish);
  }

  public addProgressListener(ytid: string, onProgress: ProgressCallback) {
    const inst = this.getOrThrow(ytid);
    inst.addOnProgressListener(onProgress);
  }
}

const downloader = new Downloader();

export default downloader;
