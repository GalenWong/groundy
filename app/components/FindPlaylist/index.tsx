import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Search from './search';

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

export default function ShowPlaylist() {
  const [query, setQuery] = useState('haha');
  const classes = useStyles();

  const handleTyping = async (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return (
    <div>
      <Paper className={classes.padded}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10}>
            <TextField autoFocus id="name" onChange={handleTyping} fullWidth />
          </Grid>
          <Grid item>
            <Button variant="outlined" size="small">
              <Typography variant="caption">Submit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Search query={query} />
    </div>
  );
}
