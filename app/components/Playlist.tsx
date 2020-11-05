import * as React from 'react';
import { List } from '@material-ui/core';
import SongCard from './SongCard';

import { Song } from '../types';

const Playlist = (props) => {
  const songs = [
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

  return (
    <List>
      {songs.map((song: Song) => (
        <SongCard key={song.ytID} song={song} variant="playlist" />
      ))}
    </List>
  );
};

export default Playlist;
