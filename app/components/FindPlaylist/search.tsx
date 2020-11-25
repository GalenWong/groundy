import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CircularProgress,
  Typography,
  IconButton,
  Grid,
  Paper,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { Playlist, Progress } from '../../types';
import { getPlaylistInfo } from '../../utils';
import PlaylistComponent from '../Playlist';
import { isDownloaded } from '../SongCard';
import { playerQueueContext } from '../../containers/PlayerWrapper/index';

interface SearchProps {
  query: string;
}

export default function Search(props: SearchProps) {
  const { query } = props;
  // const [playlist, setPlaylist] = useState<Playlist>({
  //   id: 'loading',
  //   name: 'loading',
  //   songs: [],
  // });
  return (
    <div>
      Searching query
      {query}
      ...
    </div>
  );
}
