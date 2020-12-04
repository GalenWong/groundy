import { Playlist, Song } from '../../../types';

/**
 * what a playlist looks like for the backend
 */
export interface DbPlaylist {
  name: string;
  songs: string[]; // we only store song ID
}

/**
 * what a resolved playlist looks like for the backend
 */
export interface DbResolvedPlaylist extends Playlist {
  songs: Song[]; // the downloaded songs field will be resolved in upper level module
}

/**
 * DB schema for playlsit
 */
const playlistSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    songs: { type: 'array', default: [] },
    key: { value: 'playlist' },
  },
  additionalProperties: false,
  required: ['name', 'songs'],
};

export default playlistSchema;
