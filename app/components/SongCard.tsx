import * as React from 'react';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import PlaylistActions from './PlaylistActions';
import ImportActions from './ImportActions';
import { Song } from '../types';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    height: '50px',
  },
  content: {
    display: 'flex',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  flexItem: {
    minWidth: '200px',
  },
});

const SongCard = (props: { song: Song; variant: string }) => {
  const classes = useStyles();

  const { song, variant } = props;
  const { title, channel, downloaded } = song;
  const { actions } = variant;

  return (
    <Card variant="outlined" className={classes.card}>
      <CardActionArea
        className={classes.flexItem}
        onClick={() => console.log('display info')}
      >
        <CardContent className={classes.content}>
          <Box maxWidth={1}>
            <Typography noWrap>{title}</Typography>
            <Typography variant="caption">{channel}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      {actions === 'playlist' && <PlaylistActions />}
      {actions === 'import' && <ImportActions downloaded={downloaded} />}
    </Card>
  );
};

export default SongCard;
