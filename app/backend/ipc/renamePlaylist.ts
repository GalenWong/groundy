import PlaylistModule from '../playlist';

export default async (playlistId: string, name: string) => {
  const playlistUtil = new PlaylistModule();
  await playlistUtil.renamePlaylist(playlistId, name);
};
