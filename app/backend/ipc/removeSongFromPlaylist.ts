import PlaylistModule from '../playlist/index';

/**
 * Remove a song from a local playlist
 *
 * @async
 * @param {string} songID - id of a song
 * @param {string} playlistID - id of a local playlist
 * @returns {Promise<void>} - void
 */
export default async (ytid: string, playlistId: string): Promise<void> => {
  const playlistModule = new PlaylistModule();
  await playlistModule.removeSong(ytid, playlistId);
};
