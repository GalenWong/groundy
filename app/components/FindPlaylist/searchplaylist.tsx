import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Playlist } from '../../types';
import PlaylistComponent from '../Playlist';
import { downloadPlaylist, getYouTubePlaylist } from '../../utils';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: theme.spacing(1.5),
  },
}));

interface SearchProps {
  url: string;
}

function parsePlaylistID(url: string): string {
  const m = url.match(/playlist\?list=(.*)/);
  if (m) {
    return m[1];
  }
  return '';
}

export default function SearchPlaylist(props: SearchProps) {
  const { url } = props;
  const [playlist, setPlaylist] = useState<Playlist>({
    id: 'loading',
    name: 'loading',
    songs: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getYouTubePlaylist(parsePlaylistID(url));
      setPlaylist(data);
      setIsLoading(false);
    }
    fetchData();
  }, [url]);

  const download = async () => {
    await downloadPlaylist(playlist);
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Paper>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.toolbar}
      >
        <Typography variant="h4" noWrap>
          Showing Playlist:
          {` `}
          {playlist.name}
        </Typography>
        <Button variant="outlined" onClick={download}>
          Download Playlist
        </Button>
      </Box>
      <PlaylistComponent songs={playlist.songs} />
    </Paper>
  );
}
