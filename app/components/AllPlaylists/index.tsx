import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import TextFieldsIcon from '@material-ui/icons/TextFields';
import { getAllPlaylists } from '../../utils';
import { Playlist } from '../../types';
import ListItem from './listItem';
import Add from './add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(0),
      margin: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    settingBar: {
      justifyContent: 'flex-end',
    },
  })
);

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
    <Grid container>
      <Grid item xs={12}>
        <Grid container className={classes.settingBar}>
          <Grid item>
            <Add />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {allLists.map((list: Playlist) => (
            <ListItem key={list.id} list={list} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
