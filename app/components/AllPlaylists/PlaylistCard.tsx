import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Grid, IconButton } from '@material-ui/core';
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
  })
);

export default function PlaylistCard(props: PlaylistCardProps) {
  const classes = useStyles();
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
    <Grid item xs={12}>
      <Card className={classes.playlistCard}>
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Link to={`${routes['Show Playlist']}/${list.id}`}>
                {list.name}
              </Link>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <IconButton aria-label="playPlaylist" onClick={playPlaylist}>
                    <PlaylistPlayIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton aria-label="rename" onClick={openRenameDialog}>
                    <TextFieldsIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Delete playlistID={list.id} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <RenameDialog
          open={renameOpen}
          close={closeRenameDialog}
          playlistId={list.id}
          playlistName={list.name}
        />
      </Card>
    </Grid>
  );
}
