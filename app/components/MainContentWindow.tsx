import * as React from 'react';
import { Box, Typography, Paper, makeStyles } from '@material-ui/core';
import Playlist from './Playlist';
import { Song, Progress } from '../types';

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
  songs: Song[];
  downloads: Record<string, Progress>;
}

interface MainContentProps {
  title: string;
  children: React.ReactNode;
  content: () => Promise<Song[]>;
}

const MainContentWindow = (props: MainContentProps) => {
  const [state, setState] = React.useState<State>({ songs: [], downloads: {} });
  const { title, children, content } = props;
  const { songs, downloads } = state;
  React.useEffect(() => {
    const getData = async () => {
      content()
        .then((s: Song[]) => setState({ songs: s, downloads: state.downloads }))
        .catch(() => {});
    };
    getData();
  }, []);
  const classes = useStyles();

  return (
    <Paper className={classes.padded}>
      <Box className={classes.topbar}>
        <Typography className={classes.fillSpace} variant="h4" noWrap>
          {title}
        </Typography>
        <Box>{children}</Box>
      </Box>
      <Playlist songs={songs} downloads={downloads} />
    </Paper>
  );
};

export default MainContentWindow;
