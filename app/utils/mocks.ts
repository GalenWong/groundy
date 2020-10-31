/* write mocks here */

const newPlaylist = async (name: string): Promise<string> => {
  return `Playlist ${name} created`;
};

const startDownload = async (ytID: string): Promise<void> => {};

const deleteSong = async (ytID: string): Promise<string> => {
  return `${ytID} deleted`;
};

const getSongPath = async (ytID: string): Promise<string> => {
  return `C:/Users/User/Music/example_${ytID}.mp3`;
};

export { newPlaylist, startDownload, deleteSong, getSongPath };
