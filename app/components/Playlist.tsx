import * as React from 'react';
import { List } from '@material-ui/core';
import SongCard from './SongCard';

import { DownloadedSong, Song } from '../types';
import { progressesContext } from '../containers/ProgressWrapper';

interface PlaylistProps {
  songs: (DownloadedSong | Song)[];
}

/**
 * A Song card that shows Song info and comes with different actions dependeing on
 * if it's downloaded.
 * Take an array of songs as input.
 */
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
