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
import FindRelatedActions from './FindRelatedActions';
import { Song, DownloadedSong, Progress } from '../types';

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
  song: Song | DownloadedSong;
  progress?: Progress;
}

export function isDownloaded(
  thing: Song | DownloadedSong
): thing is DownloadedSong {
  if ((thing as DownloadedSong).filePath) {
    return true;
  }
  return false;
}

const SongCard = (props: SongCardProps) => {
  const classes = useStyles();

  const { song, progress } = props;
  const { title, channel, downloaded, ytID } = song;

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
      {isDownloaded(song) && <PlaylistActions song={song} />}
      {!isDownloaded(song) && (
        <ImportActions
          downloaded={downloaded}
          progress={progress}
          ytid={ytID}
        />
      )}
      <FindRelatedActions song={song} />
    </Card>
  );
};

export default SongCard;

SongCard.defaultProps = {
  progress: undefined,
};
