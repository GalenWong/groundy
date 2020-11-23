import { Playlist } from '../../types';

export default async (_URLorID: string): Promise<Playlist> => {
  return {
    name: 'empty playlist',
    id: 'abc',
    songs: [],
  };
};
