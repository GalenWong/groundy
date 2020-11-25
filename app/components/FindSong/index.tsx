import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Playlist, Progress } from '../../types';
import { getPlaylistInfo } from '../../utils';
import PlaylistComponent from '../Playlist';

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

export default function FindSong() {
  const { id }: { id: string } = useParams();
  const [playlist, setPlaylist] = useState<Playlist>({
    id: 'loading',
    name: 'loading',
    songs: [],
  });
  const [downloads, setDownloads] = useState<Record<string, Progress>>({});
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getPlaylistInfo(id);
      setPlaylist(data);
      setDownloads({});
      setIsLoading(false);
    }
    fetchData();
  }, [id]);
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
      </Grid>
      <Grid item>
        <PlaylistComponent songs={playlist.songs} downloads={downloads} />
      </Grid>
    </Paper>
  );
}
