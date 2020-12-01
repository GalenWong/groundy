import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deletePlaylist } from '../../utils';
import useRouteRefresh from '../../hooks/useRouteRefresh';

interface DeleteProps {
  playlistID: string;
}

export default function Delete(props: DeleteProps) {
  const [open, setOpen] = React.useState(false);
  const { playlistID } = props;

  const refreshRoute = useRouteRefresh();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = async () => {
    await deletePlaylist(props.playlistID);
    setOpen(false);
    refreshRoute();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Sure you wanna delete ${playlistID}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Nope
          </Button>
          <Button onClick={handleYes} color="primary">
            Yup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
