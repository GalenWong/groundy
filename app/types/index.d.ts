/**
 * @typeParam Song - Contains info of a local/online song
 */
export interface Song {
  title: string;
  channel: string;
  ytID: string;
  downloaded: boolean;
  fileName?: string;
}

/**
 * @typeParam Playlist - Contains info of a local playlist
 *
 */
export interface Playlist {
  id: string;
  name: string;
  songs: (DownloadedSong | Song)[];
}

/**
 * @typeParam Progress - Used for tracking download progress
 *
 */
export interface Progress {
  ytID: string;
  total: bigint;
  current: bigint;
}

/**
 * @typeParam ActionVariant
 *
 */
export type ActionVariant = 'import' | 'playlist';

/**
 * @typeParam DownloadedSong - Used for downloaded songs
 *
 */
export interface DownloadedSong extends Song {
  downloaded: true;
  filePath: string;
}

// just to finish the doc
// will clarify what Account is later
export interface Account {
  token: string;
}
