import * as React from 'react';
import { Box, Typography, Paper, makeStyles, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import Playlist from '../Playlist';
import { DownloadedSong, Song } from '../../types';
import { getAllRecommendation, startDownload } from '../../utils';
import { isDownloaded } from '../SongCard';

const useStyles = makeStyles({
  topbar: {
    display: 'flex',
  },
  fillSpace: {
    flex: '1',
  },
  padded: {
    padding: '10px',
  },
});

interface State {
  songs: (DownloadedSong | Song)[];
}

const Recommended = () => {
  const [state, setState] = React.useState<State>({ songs: [] });
  const { songs } = state;
  React.useEffect(() => {
    const getData = async () => {
      getAllRecommendation()
        .then((s: (DownloadedSong | Song)[]) => setState({ songs: s }))
        .catch(() => {});
    };
    getData();
  }, []);
  const classes = useStyles();

  function downloadAll(sgs: (Song | DownloadedSong)[]): void {
    sgs
      .filter((s) => !isDownloaded(s))
      .forEach((sng: Song | DownloadedSong) => startDownload(sng.ytID));
  }

  return (
    <Paper className={classes.padded}>
      <Box className={classes.topbar}>
        <Typography className={classes.fillSpace} variant="h4" noWrap>
          Recommended
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
  );
};

export default Recommended;
