import * as React from 'react';
import { Box, Typography, Paper, makeStyles, Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Playlist from '../Playlist';
import { DownloadedSong, Song, Progress } from '../../types';
import { getAllRecommendation } from '../../utils';
import { playerQueueContext } from '../../containers/PlayerWrapper/index';

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
  downloads: Record<string, Progress>;
}

const Recommended = () => {
  const [state, setState] = React.useState<State>({ songs: [], downloads: {} });
  const { songs, downloads } = state;
  // const controls = React.useContext(playerQueueContext);
  React.useEffect(() => {
    const getData = async () => {
      getAllRecommendation()
        .then((s: (DownloadedSong | Song)[]) =>
          setState({ songs: s, downloads: state.downloads })
        )
        .catch(() => {});
    };
    getData();
  }, []);
  const classes = useStyles();

  return (
    <Paper className={classes.padded}>
      <Box className={classes.topbar}>
        <Typography className={classes.fillSpace} variant="h4" noWrap>
          Recommended
        </Typography>
        <Box>
          <Button>
            <Typography variant="caption">Action</Typography>
            <PlayArrowIcon />
          </Button>
        </Box>
      </Box>
      <Playlist songs={songs} downloads={downloads} />
    </Paper>
  );
};

export default Recommended;
