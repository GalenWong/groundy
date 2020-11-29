import PlaylistModule from '../playlist/index';

export default async (id: string): Promise<void> => {
  const playlistModule = new PlaylistModule();
  await playlistModule.removePlaylist(id);
};
