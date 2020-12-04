import PlaylistModule from '../playlist';

/**
 * Rename a playlist
 * @async
 * @param {string} playlistId - id of the renaming list
 * @param {string} name - new name'
 * @return {Promise<void>} - Promise that resolves to void
 */
export default async (playlistId: string, name: string) => {
  const playlistUtil = new PlaylistModule();
  await playlistUtil.renamePlaylist(playlistId, name);
};
