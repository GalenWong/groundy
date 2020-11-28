import PlaylistModule from '../playlist/index';

export default async (ytid: string, playlistId: string): Promise<void> => {
  const playlistModule = new PlaylistModule();
  await playlistModule.removeSong(ytid, playlistId);
};
