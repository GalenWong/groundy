import { Playlist, Song } from '../../types';

// Might wrap them in a class in the future

/**
 * Add a song to the playlist
 * @async
 */
export async function addSong(
  song: Song,
  playlist: Playlist
): Promise<boolean> {
  return song.title !== 'Failed' || playlist.name !== 'Failed';
}

/**
 * Create a new Playlist
 * @async
 */
export async function createPlaylist(name: string): Promise<Playlist> {
  return {
    id: 'mock-playlist-996',
    name,
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
 * Get a playlist
 * @async
 */
export async function getPlaylist(id: string): Promise<Playlist> {
  return {
    id,
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
 * Remove a playlist
 * @async
 */
export async function removePlaylist(id: string): Promise<boolean> {
  return id !== 'Failed';
}
