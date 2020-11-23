import { Playlist, Song, Account } from '../../types';

// Might wrap them in a class in the future

/**
 * Add a song to the DB
 * @async
 */
export async function addSong(song: Song): Promise<boolean> {
  return song.title !== 'Failed';
}

/**
 * Remove a song from the DB
 * @async
 */
export async function removeSong(song: Song): Promise<boolean> {
  return song.title !== 'Failed';
}

/**
 * Modify a Song in the DB
 * @async
 */
export async function modifySong(song: Song): Promise<boolean> {
  return song.title !== 'Failed';
}

/**
 * Get all downloaded songs in an array
 * @async
 */
export async function getAllDownloaded(): Promise<Song[]> {
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
    {
      title: 'Official髭男dism - Pretender［Official Video］',
      channel: 'Official髭男dism',
      ytID: 'TQ8WlA2GXbk',
      downloaded: true,
      fileName:
        'Official髭男dism - Pretender［Official Video］-TQ8WlA2GXbk.mp3',
    },
  ];
}

/**
 * Get all Playlists in an array
 * @async
 */
export async function getAllPlaylist(): Promise<Playlist[]> {
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
}

/**
 * Get a playlsit given an id
 * @async
 */
export async function getPlaylist(id: string): Promise<Playlist> {
  return {
    id: `${id}`,
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
}

/**
 * Delete a playlist from the DB given an id
 * @async
 */
export async function deletePlaylist(id: string): Promise<boolean> {
  return id !== 'Failed';
}

/**
 * Modify a playlist in the DB
 * @async
 */
export async function modifyPlaylist(playlist: Playlist): Promise<boolean> {
  return playlist.name !== 'Failed';
}

/**
 * Add an account to the DB
 * @async
 */
export async function addAccount(account: Account): Promise<boolean> {
  return account.token !== 'Failed';
}

/**
 * Get the current account
 * @async
 */
export async function getAccount(): Promise<Account> {
  return { token: 'a token string' };
}

/**
 * Remove an account from the DB
 * @async
 */
export async function removeAccount(account: Account): Promise<boolean> {
  return account.token !== 'Failed';
}
