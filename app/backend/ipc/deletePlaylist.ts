import PlaylistModule from '../playlist/index';

/**
 * Delete a local playlist
 *
 * @async
 * @param {string} playlistID - id of a local playlist
 * @returns {Promise<void>} - Promise that resolves to void
 */
export default async (id: string): Promise<void> => {
  const playlistModule = new PlaylistModule();
  await playlistModule.removePlaylist(id);
};
