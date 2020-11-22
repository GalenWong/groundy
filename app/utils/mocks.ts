import { Playlist, DownloadedSong, Song } from '../types';

/**
 * Check Google Account Login Status
 *
 * @async
 * @returns {Promise<boolean>}
 */
const isUserLoggedIn = async (): Promise<boolean> => {
  return false;
};

/**
 * Get all downloaded songs in an array
 *
 * @async
 * @returns {Promise<Song[]>}
 */
const getAllDownloads = async (): Promise<(Song | DownloadedSong)[]> => {
  return [
    {
      title: 'Fkj & Masego - Tadow',
      channel: 'Fkj',
      ytID: 'hC8CH0Z3L54',
      downloaded: true,
      fileName: 'Fkj & Masego - Tadow-hC8CH0Z3L54.mp3',
    },
    {
      title: 'Official髭男dism - Pretender［Official Video］',
      channel: 'Official髭男dism',
      ytID: 'TQ8WlA2GXbk',
      downloaded: true,
      fileName:
        'Official髭男dism - Pretender［Official Video］-TQ8WlA2GXbk.mp3',
    },
    {
      title:
        'The Reason I Wanted To Die 僕が死のうと思ったのは【Cover: Nakashima Mika】【Lyrics: amazarashi】',
      channel: '李健宏',
      ytID: '0HTAKT-JIaA',
      downloaded: true,
      fileName: '單曲推薦僕が死のうと思ったのは薇爾莉特.mp3',
      filePath:
        'D:/Users/Tony/Downloads/單曲推薦僕が死のうと思ったのは薇爾莉特.mp3',
    },
    {
      title:
        'Niccolò Paganini - Caprice for Solo Violin, Op. 1 No. 4 (Sheet Music)',
      channel: 'TheExarion',
      ytID: 'lZgWBwsO2EM',
      downloaded: true,
      fileName:
        'Niccolò Paganini - Caprice for Solo Violin, Op. 1 No. 4 (Sheet Music).mp3',
      filePath:
        'D:/Users/Tony/Downloads/Niccolò Paganini - Caprice for Solo Violin, Op. 1 No. 4 (Sheet Music).mp3',
    },
  ];
};

/**
 * Get an array of songs based on user account
 *
 * @async
 * @returns {Promise<Song[]>}
 */
const getAllRecommendation = async (): Promise<(DownloadedSong | Song)[]> => {
  return [
    {
      title: 'Fkj & Masego - Tadow',
      channel: 'Fkj',
      ytID: 'hC8CH0Z3L54',
      downloaded: true,
      fileName: 'Fkj & Masego - Tadow-hC8CH0Z3L54.mp3',
    },
    {
      title: 'サカナクション / 新宝島　-New Album「834.194」(6/19 release)-',
      channel: 'NFRecords sakanaction',
      ytID: 'LIlZCmETvsY',
      downloaded: false,
    },
  ];
};

/**
 * Get a public playlist with a url
 *
 * @async
 * @param {string} _playlistURL - url of a public playlist
 * @returns {Promise<Playlist>} - Promise that resolves to a Playlist
 */
const getYouTubePlaylist = async (_playlistURL: string): Promise<Playlist> => {
  return {
    id: 'mock-playlist-1',
    name: 'Mock Playlist 1',
    songs: [
      {
        title: 'Fkj & Masego - Tadow',
        channel: 'Fkj',
        ytID: 'hC8CH0Z3L54',
        downloaded: true,
        fileName: 'Fkj & Masego - Tadow-hC8CH0Z3L54.mp3',
      },
      {
        title: 'サカナクション / 新宝島　-New Album「834.194」(6/19 release)-',
        channel: 'NFRecords sakanaction',
        ytID: 'LIlZCmETvsY',
        downloaded: false,
      },
      {
        title: 'Official髭男dism - Pretender［Official Video］',
        channel: 'Official髭男dism',
        ytID: 'TQ8WlA2GXbk',
        downloaded: true,
        fileName:
          'Official髭男dism - Pretender［Official Video］-TQ8WlA2GXbk.mp3',
      },
    ],
  };
};

/**
 * Get a public song with a url
 *
 * @async
 * @param {string} _songURL - url of a public song
 * @returns {Promise<Song>} - Promise that resolves to a Song
 */
const getYouTubeSong = async (
  _songURL: string
): Promise<Song | DownloadedSong> => {
  return {
    title: 'サカナクション / 新宝島　-New Album「834.194」(6/19 release)-',
    channel: 'NFRecords sakanaction',
    ytID: 'LIlZCmETvsY',
    downloaded: false,
  };
};

/**
 * Get all local playlists
 *
 * @async
 * @returns {Promise<Playlist[]>}
 */
const getAllPlaylists = async (): Promise<Playlist[]> => {
  return [
    {
      id: `mock-playlist-1`,
      name: 'Mock Playlist 1',
      songs: [
        {
          title: 'Fkj & Masego - Tadow',
          channel: 'Fkj',
          ytID: 'hC8CH0Z3L54',
          downloaded: true,
          fileName: 'Fkj & Masego - Tadow-hC8CH0Z3L54.mp3',
        },
        {
          title:
            'サカナクション / 新宝島　-New Album「834.194」(6/19 release)-',
          channel: 'NFRecords sakanaction',
          ytID: 'LIlZCmETvsY',
          downloaded: false,
        },
        {
          title: 'Official髭男dism - Pretender［Official Video］',
          channel: 'Official髭男dism',
          ytID: 'TQ8WlA2GXbk',
          downloaded: true,
          fileName:
            'Official髭男dism - Pretender［Official Video］-TQ8WlA2GXbk.mp3',
        },
      ],
    },
    {
      id: `mock-playlist-2`,
      name: 'Mock Playlist 2',
      songs: [
        {
          title: 'Fkj & Masego - Tadow',
          channel: 'Fkj',
          ytID: 'hC8CH0Z3L54',
          downloaded: true,
          fileName: 'Fkj & Masego - Tadow-hC8CH0Z3L54.mp3',
        },
        {
          title:
            'サカナクション / 新宝島　-New Album「834.194」(6/19 release)-',
          channel: 'NFRecords sakanaction',
          ytID: 'LIlZCmETvsY',
          downloaded: false,
        },
        {
          title: 'Official髭男dism - Pretender［Official Video］',
          channel: 'Official髭男dism',
          ytID: 'TQ8WlA2GXbk',
          downloaded: true,
          fileName:
            'Official髭男dism - Pretender［Official Video］-TQ8WlA2GXbk.mp3',
        },
      ],
    },
  ];
};

/**
 * Get info of a playlist
 *
 * @async
 * @param {string} playlistID - the unique ID of a local playlist
 * @returns {Promise<Playlist>} - Promise that resolves to a Playlist
 */
const getPlaylistInfo = async (playlistID: string): Promise<Playlist> => {
  return {
    id: playlistID,
    name: 'Mock Playlist 1',
    songs: [
      {
        title: 'Fkj & Masego - Tadow',
        channel: 'Fkj',
        ytID: 'hC8CH0Z3L54',
        downloaded: true,
        fileName: 'Fkj & Masego - Tadow-hC8CH0Z3L54.mp3',
      },
      {
        title: 'サカナクション / 新宝島　-New Album「834.194」(6/19 release)-',
        channel: 'NFRecords sakanaction',
        ytID: 'LIlZCmETvsY',
        downloaded: false,
      },
      {
        title: 'Official髭男dism - Pretender［Official Video］',
        channel: 'Official髭男dism',
        ytID: 'TQ8WlA2GXbk',
        downloaded: true,
        fileName:
          'Official髭男dism - Pretender［Official Video］-TQ8WlA2GXbk.mp3',
      },
    ],
  };
};

/**
 * Delete a local playlist
 *
 * @async
 * @param {string} playlistID - id of a local playlist
 * @returns {Promise<boolean>} - Promise that resolves to a boolean
 */
const deletePlaylist = async (playlistID: string): Promise<boolean> => {
  console.log(`playlist ${playlistID} is deleted!`);
  return playlistID !== 'false';
};

/**
 * Add a song to a local playlist
 *
 * @async
 * @param {string} songID - id of a song
 * @param {string} playlistID - id of a local playlist
 * @returns {Promise<boolean>}
 */
const addSongToPlaylist = async (
  songID: string,
  playlistID: string
): Promise<boolean> => {
  return songID !== 'false' || playlistID !== 'false';
};

/**
 * Remove a song to a local playlist
 *
 * @async
 * @param {string} songID - id of a song
 * @param {string} playlistID - id of a local playlist
 * @returns {Promise<string>} - success/failure message
 */
const removeSongFromPlaylist = async (
  songID: string,
  playlistID: string
): Promise<string> => {
  return `Song ${songID} was successfully removed from playlist ${playlistID}`;
};

/**
 * Create a new local playlist
 *
 * @async
 * @param {string} name - id of a song
 * @returns {Promise<string>} - success/failure message
 */
const newPlaylist = async (name: string): Promise<string> => {
  console.log(`Playlist ${name} created`);
  return `Playlist ${name} created`;
};

/**
 * Start downloading a song
 *
 * @async
 * @param {string} ytID - id of a song
 * @returns {Promise<string>} - success/failure message
 */
const startDownload = async (ytID: string): Promise<string> => {
  return `Download ${ytID} started`;
};

/**
 * Delete a local song
 *
 * @async
 * @param {string} ytID - id of a song
 * @returns {Promise<string>} - success/failure message
 */
const deleteSong = async (ytID: string): Promise<string> => {
  return `${ytID} deleted`;
};

/**
 * Get the path to a local song file
 *
 * @async
 * @param {string} ytID - id of a song
 * @returns {Promise<string>} - path string
 */
const getSongPath = async (ytID: string): Promise<string> => {
  return `C:/Users/User/Music/example_${ytID}.mp3`;
};

export {
  isUserLoggedIn,
  getAllDownloads,
  getAllRecommendation,
  getYouTubePlaylist,
  getYouTubeSong,
  getAllPlaylists,
  getPlaylistInfo,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  newPlaylist,
  startDownload,
  deleteSong,
  getSongPath,
};
