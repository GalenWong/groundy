import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { newPlaylist } from '../../utils';
import useRouteRefresh from '../../hooks/useRouteRefresh';

/**
 * Button component that once clicked, will prompt users
 * type the name of the newly created playlsit.
 */
export default function Add() {
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState('New Playlist Name');

  const refreshRoute = useRouteRefresh();

  const handleClickOpen = () => {
    setNewName('New Playlist Name');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    await newPlaylist(newName);
    setOpen(false);
    refreshRoute();
  };

  const handleTyping = async (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewName(e.target.value);
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a new list</DialogTitle>
        <DialogContent>
          <DialogContentText>Give your new playlist a name!</DialogContentText>
          <TextField autoFocus id="name" onChange={handleTyping} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
