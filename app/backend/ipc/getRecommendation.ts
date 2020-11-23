import { Playlist } from '../../types';

export default async (): Promise<Playlist> => {
  return {
    name: 'empty playlist',
    id: 'abc',
    songs: [],
  };
};
