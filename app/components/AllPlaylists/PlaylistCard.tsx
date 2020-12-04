import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  IconButton,
  CardActionArea,
  CardActions,
  Box,
  Typography,
} from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import routesJSON from '../../constants/routes.json';
import { Playlist, Song, DownloadedSong } from '../../types';
import { isDownloaded } from '../../utils';
import Delete from './delete';
import { playerQueueContext } from '../../containers/PlayerWrapper/index';
import RenameDialog from '../RenameDialog';
import useRouteRefresh from '../../hooks/useRouteRefresh';

interface PlaylistCardProps {
  list: Playlist;
}

interface RoutesObject {
  [index: string]: string;
}
const routes: RoutesObject = routesJSON;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    playlistCard: {
      padding: theme.spacing(0),
      margin: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
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
      flex: '1 1 auto',
      minWidth: '200px',
    },
  })
);

/**
 * Card component that display a playlist as a card.
 * Provides actions like renaming and adding all to queue
 */
export default function PlaylistCard(props: PlaylistCardProps) {
  const classes = useStyles();
  const history = useHistory();
  const controls = React.useContext(playerQueueContext);
  const { list } = props;
  const [renameOpen, setRenameOpen] = React.useState(false);

  const refreshRoute = useRouteRefresh();

  const openRenameDialog = () => {
    setRenameOpen(true);
  };

  const closeRenameDialog = () => {
    setRenameOpen(false);
    refreshRoute();
  };

  function getDownloaded(sgs: (Song | DownloadedSong)[]): DownloadedSong[] {
    return sgs.filter(isDownloaded);
  }
  const playPlaylist = () =>
    controls.makePlaylistQueue(getDownloaded(list.songs));

  return (
    <Card variant="outlined" className={classes.card}>
      <CardActionArea
        className={classes.flexItem}
        onClick={() => history.push(`${routes['Show Playlist']}/${list.id}`)}
      >
        <CardContent className={classes.content}>
          <Box maxWidth={1}>
            <Typography noWrap>{list.name}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="playPlaylist" onClick={playPlaylist}>
          <PlaylistPlayIcon />
        </IconButton>
        <IconButton aria-label="rename" onClick={openRenameDialog}>
          <TextFieldsIcon />
        </IconButton>
        <Delete playlistID={list.id} />
      </CardActions>
      <RenameDialog
        open={renameOpen}
        close={closeRenameDialog}
        playlistId={list.id}
        playlistName={list.name}
      />
    </Card>
  );
}
