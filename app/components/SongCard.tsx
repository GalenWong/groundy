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
import { getSongState } from '../utils';

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

function useFreshSongState(
  propSong: Song | DownloadedSong,
  progress?: Progress
) {
  const [song, setSong] = React.useState<Song | DownloadedSong>(propSong);

  React.useEffect(() => {
    setSong(propSong);
  }, [propSong]);

  React.useEffect(() => {
    const refreshSong = async () => {
      const newSongState = await getSongState(song.ytID);
      if (newSongState === null) return;
      if (newSongState.downloaded !== song.downloaded) {
        setSong(newSongState);
      }
    };
    // check only when it is 100%
    if (progress && progress.current === progress.total && !song.downloaded)
      refreshSong();
  }, [progress, song]);

  return song;
}

const SongCard = (props: SongCardProps) => {
  const classes = useStyles();

  const { song: propSong, progress } = props;

  const song = useFreshSongState(propSong, progress);
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
