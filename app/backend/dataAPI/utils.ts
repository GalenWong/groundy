import { Playlist, Song } from '../../types';

/**
 * Get a recommended playlist based on account
 * @async
 */
export async function getRecommendations(token: string): Promise<Playlist> {
  return {
    id: `recommended-playlist-for-${token}`,
    name: `recommended-playlist-for-${token}`,
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
 * Get a related playlist based on a song's ytid
 * @async
 */
export async function getRelated(ytid: string): Promise<Playlist> {
  return {
    id: `related-playlist-for-${ytid}`,
    name: `related-playlist-for-${ytid}`,
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
 * Get a playlist from youtube
 * @async
 */
export async function getPlaylist(playlistId: string): Promise<Playlist> {
  return {
    id: `${playlistId}`,
    name: `mock-playlist-for-${playlistId}`,
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
 * Get a song from youtube
 * @async
 */
export async function getSong(ytId: string): Promise<Song> {
  return {
    title: 'サカナクション / 新宝島　-New Album「834.194」(6/19 release)-',
    channel: 'NFRecords sakanaction',
    ytID: `${ytId}`,
    downloaded: false,
  };
}
