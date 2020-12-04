import * as React from 'react';
import { Box, Typography, Paper, makeStyles, Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Playlist from '../Playlist';
import { DownloadedSong, Song } from '../../types';
import { getAllDownloads, isDownloaded } from '../../utils';
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
}

// example download
// {'hC8CH0Z3L54': {ytID: 'hC8CH0Z3L54', total: BigInt(20000), current: BigInt(11000)}}

/**
 * Page Component that displays all downloaded songs.
 * Users can find all songs that are ever downloaded and not deleted in this page.
 */
const Downloaded = () => {
  const [state, setState] = React.useState<State>({ songs: [] });
  const { songs } = state;
  const controls = React.useContext(playerQueueContext);
  React.useEffect(() => {
    const getData = async () => {
      getAllDownloads()
        .then((s: (DownloadedSong | Song)[]) => setState({ songs: s }))
        .catch(() => {});
    };
    getData();
  }, []);
  const classes = useStyles();

  function getDownloaded(sgs: (Song | DownloadedSong)[]): DownloadedSong[] {
    return sgs.filter(isDownloaded);
  }

  return (
    <Paper className={classes.padded}>
      <Box className={classes.topbar}>
        <Typography className={classes.fillSpace} variant="h4" noWrap>
          Downloaded
        </Typography>
        <Box>
          <Button
            onClick={() => controls.makePlaylistQueue(getDownloaded(songs))}
          >
            <Typography variant="caption">Play All</Typography>
            <PlayArrowIcon />
          </Button>
        </Box>
      </Box>
      <Playlist songs={songs} />
    </Paper>
  );
};

export default Downloaded;
