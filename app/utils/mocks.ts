/* write mocks here */

import { Playlist, Song } from '../types';

const isUserLoggedIn = async (): Promise<boolean> => {
  return false;
};

const getAllDownloads = async (): Promise<Song[]> => {
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
  ];
};

const getAllRecommendation = async (): Promise<Song[]> => {
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

const getYouTubeSong = async (_playlistURL: string): Promise<Song> => {
  return {
    title: 'サカナクション / 新宝島　-New Album「834.194」(6/19 release)-',
    channel: 'NFRecords sakanaction',
    ytID: 'LIlZCmETvsY',
    downloaded: false,
  };
};

export {
  isUserLoggedIn,
  getAllDownloads,
  getAllRecommendation,
  getYouTubePlaylist,
  getYouTubeSong,
};