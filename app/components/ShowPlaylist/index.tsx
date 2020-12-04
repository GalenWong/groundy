import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CircularProgress,
  Typography,
  IconButton,
  Grid,
  Paper,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { Playlist } from '../../types';
import { getPlaylistInfo, isDownloaded } from '../../utils';
import PlaylistComponent from '../Playlist';
import { playerQueueContext } from '../../containers/PlayerWrapper/index';

const useStyles = makeStyles(() =>
  createStyles({
    fillSpace: {
      flex: '1',
    },
    padded: {
      padding: '10px',
    },
  })
);

/**
 * Page component for showing all songs in a playlist based on its routing url.
 *
 */
export default function ShowPlaylist() {
  const { id }: { id: string } = useParams();
  const controls = React.useContext(playerQueueContext);
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
      const data = await getPlaylistInfo(id);
      setPlaylist(data);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);
  const playAll = () =>
    controls.makePlaylistQueue(playlist.songs.filter(isDownloaded));
  return isLoading ? (
    <CircularProgress color="secondary" />
  ) : (
    <Paper className={classes.padded}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography className={classes.fillSpace} variant="h4" noWrap>
            {playlist.name}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={playAll}>
            <PlaylistPlayIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>
        <PlaylistComponent songs={playlist.songs} />
      </Grid>
    </Paper>
  );
}
