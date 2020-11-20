import * as React from 'react';
import { List } from '@material-ui/core';
import SongCard from './SongCard';

import { Song, Progress, ActionVariant } from '../types';

interface PlaylistProps {
  songs: Song[];
  downloads: Record<string, Progress>;
}

const Playlist = (props: PlaylistProps) => {
  const { songs, downloads } = props;

  return (
    <List>
      {songs.map((song: Song) => {
        const actions: ActionVariant = song.downloaded ? 'playlist' : 'import';
        return (
          <SongCard
            key={song.ytID}
            song={song}
            variant={actions}
            progress={downloads[song.ytID]}
          />
        );
      })}
    </List>
  );
};

export default Playlist;
