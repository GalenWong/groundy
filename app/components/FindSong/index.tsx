import React, { useState } from 'react';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SearchSong from './searchsong';

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
  const [url, seturl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const classes = useStyles();

  const handleTyping = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitted(false);
    seturl(e.target.value);
  };
  const handleSubmit = () => setIsSubmitted(true);
  return (
    <div>
      <Paper className={classes.padded}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10}>
            <TextField
              autoFocus
              id="name"
              onChange={handleTyping}
              label="Video URL"
              helperText="Copy video link from browser"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" size="small" onClick={handleSubmit}>
              <Typography variant="caption">Submit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {isSubmitted && url !== '' ? <SearchSong url={url} /> : ''}
    </div>
  );
}
