import * as React from 'react';
import { List } from '@material-ui/core';
import SongCard from './SongCard';

import { Song, Progress } from '../types';

interface PlaylistProps {
  songs: Song[];
  downloads: Record<string, Progress>;
  window: string;
}

const Playlist = (props: PlaylistProps) => {
  const { songs, downloads, window } = props;

  return (
    <List>
      {songs.map((song: Song) => (
        <SongCard
          key={song.ytID}
          song={song}
          variant={window}
          progress={downloads[song.ytID]}
        />
      ))}
    </List>
  );
};

export default Playlist;
