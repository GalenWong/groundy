import { Playlist } from '../../types';

export default async (id: string): Promise<Playlist> => {
  return {
    name: 'empty playlist',
    id,
    songs: [],
  };
};
