import * as React from 'react';
import { List } from '@material-ui/core';
import SongCard from './SongCard';

import { DownloadedSong, Song, Progress } from '../types';

interface PlaylistProps {
  songs: (DownloadedSong | Song)[];
  downloads: Record<string, Progress>;
}

const Playlist = (props: PlaylistProps) => {
  const { songs, downloads } = props;

  return (
    <List>
      {songs.map((song: Song | DownloadedSong) => {
        return (
          <SongCard
            key={song.ytID}
            song={song}
            progress={downloads[song.ytID]}
          />
        );
      })}
    </List>
  );
};

export default Playlist;
