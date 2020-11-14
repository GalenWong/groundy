export interface Song {
  title: string;
  channel: string;
  ytID: string;
  downloaded: boolean;
  fileName?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

export interface DownloadedSong extends Song {
  downloaded: true;
  filePath: string;
}
