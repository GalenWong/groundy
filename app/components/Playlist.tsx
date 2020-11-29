import * as React from 'react';
import { List } from '@material-ui/core';
import SongCard from './SongCard';

import { DownloadedSong, Song } from '../types';
import { progressesContext } from '../containers/ProgressWrapper';

interface PlaylistProps {
  songs: (DownloadedSong | Song)[];
}

const Playlist = (props: PlaylistProps) => {
  const { progresses } = React.useContext(progressesContext);
  const { songs } = props;

  return (
    <List>
      {songs.map((song: Song | DownloadedSong) => {
        return (
          <SongCard
            key={song.ytID}
            song={song}
            progress={progresses[song.ytID]}
          />
        );
      })}
    </List>
  );
};

export default Playlist;
