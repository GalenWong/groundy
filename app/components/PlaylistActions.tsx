import * as React from 'react';

import {
  CardActions,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueIcon from '@material-ui/icons/Queue';

import { playerQueueContext } from '../containers/PlayerWrapper/index';
import { DownloadedSong } from '../types';
import { deleteSong } from '../utils/index';

interface PlaylistActionProps {
  song: DownloadedSong;
}

const PlaylistActions = (props: PlaylistActionProps) => {
  const [state, setState] = React.useState({ open: false });
  const { song } = props;
  const { open } = state;
  const controls = React.useContext(playerQueueContext);

  const openDialog = () => {
    setState({ open: true });
  };

  const closeDialog = () => {
    setState({ open: false });
  };

  const handleDelete = () => {
    deleteSong(song.ytID);
    closeDialog();
  };

  return (
    <CardActions>
      <IconButton key={1} onClick={() => controls.playSong(song)}>
        <PlayArrowIcon />
      </IconButton>
      <IconButton key={2} onClick={() => controls.addSongToQueue(song)}>
        <QueueIcon />
      </IconButton>
      <IconButton key={3}>
        <PlaylistAddIcon />
      </IconButton>
      <IconButton key={4} onClick={openDialog}>
        <ClearIcon />
      </IconButton>
      <Dialog open={open} onClose={closeDialog}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this song?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={closeDialog} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </CardActions>
  );
};

export default PlaylistActions;