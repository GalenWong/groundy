import * as React from 'react';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
} from '@material-ui/core';
import PlaylistActions from './PlaylistActions';
import ImportActions from './ImportActions';
import { Song, Progress, ActionVariant } from '../types';

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

interface SongCardProps {
  song: Song;
  variant: ActionVariant;
  progress?: Progress;
}

const SongCard = (props: SongCardProps) => {
  const classes = useStyles();

  const { song, variant, progress } = props;
  const { title, channel, downloaded } = song;

  return (
    <Card variant="outlined" className={classes.card}>
      <CardActionArea className={classes.flexItem}>
        <CardContent className={classes.content}>
          <Box maxWidth={1}>
            <Typography noWrap>{title}</Typography>
            <Typography variant="caption" noWrap>
              {channel}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      {variant === 'playlist' && <PlaylistActions />}
      {variant === 'import' && (
        <ImportActions downloaded={downloaded} progress={progress} />
      )}
    </Card>
  );
};

export default SongCard;

SongCard.defaultProps = {
  progress: undefined,
};
