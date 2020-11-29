import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Paper,
  Button,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Song, DownloadedSong } from '../../types';
import { getRelated, startDownload, isDownloaded } from '../../utils';
import Playlist from '../Playlist';

const useStyles = makeStyles(() =>
  createStyles({
    fillSpace: {
      flex: '1',
    },
    padded: {
      padding: '10px',
    },
    topbar: {
      display: 'flex',
    },
  })
);
interface State {
  songs: (DownloadedSong | Song)[];
}

export default function FindRelated() {
  const { id }: { id: string } = useParams();
  const [state, setState] = React.useState<State>({ songs: [] });
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const { songs } = state;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getRelated(id);
      setState({ songs: data });
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  function downloadAll(sgs: (Song | DownloadedSong)[]): void {
    sgs
      .filter((s) => !isDownloaded(s))
      .forEach((sng: Song | DownloadedSong) => startDownload(sng.ytID));
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div>
      <Paper className={classes.padded}>
        <Box className={classes.topbar}>
          <Typography className={classes.fillSpace} variant="h4" noWrap>
            Related to:
            {id}
          </Typography>
          <Box>
            <Button onClick={() => downloadAll(songs)}>
              <Typography variant="caption">Download All</Typography>
              <GetAppIcon />
            </Button>
          </Box>
        </Box>
        <Playlist songs={songs} />
      </Paper>
    </div>
  );
}
