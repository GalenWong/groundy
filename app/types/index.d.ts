export interface Song {
  title: string;
  channel: string;
  ytID: string;
  downloaded: boolean;
  fileName?: string;
  thumbnailUrl?: string;
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

export interface Token {
  refresh_token?: string;
  expiry_date?: string;
  access_token?: string;
  token_type?: string;
  id_token: string;
  scope?: string;
}
