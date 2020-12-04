import PlaylistModule from '../playlist/index';

/**
 * Add a song to a local playlist
 *
 * @async
 * @param {string} songID - id of a song to be added to the playlist
 * @param {string} playlistID - id of a local playlist for a song to be added to
 * @returns {Promise<void>} - Promise that resolves to void
 */
export default async (ytid: string, playlistId: string): Promise<void> => {
  const playlistModule = new PlaylistModule();
  await playlistModule.addSong(ytid, playlistId);
};
