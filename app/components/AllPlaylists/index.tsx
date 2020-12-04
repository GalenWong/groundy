import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  Paper,
  List,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getAllPlaylists } from '../../utils';
import { Playlist } from '../../types';
import PlaylistCard from './PlaylistCard';
import Add from './add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(0),
      margin: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    fillSpace: {
      flex: '1',
    },
    padded: {
      padding: '10px',
    },
  })
);

/**
 * Page component that displays all downloaded playlists.
 * Users can see all created playlists in this page.
 */
export default function AllPlaylists() {
  const [allLists, setAllLists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  // fetch only once, no update
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getAllPlaylists();
      setAllLists(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return isLoading ? (
    <CircularProgress color="secondary" />
  ) : (
    <Paper className={classes.padded}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography className={classes.fillSpace} variant="h4" noWrap>
            All Playlists
          </Typography>
        </Grid>
        <Grid item>
          <Add />
        </Grid>
        <Grid item xs={12}>
          <List>
            {allLists.map((list: Playlist) => (
              <PlaylistCard key={list.id} list={list} />
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}
