import React, { useState } from 'react';
import {
  DialogProps,
  Dialog,
  Input,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { renamePlaylist } from '../../utils';

export interface RenameDialogProps extends DialogProps {
  playlistId: string;
  playlistName: string;
  close: () => void;
}

/**
 * Dialog that takes user input for playlist renaming
 *
 */
export default function RenameDialog(props: RenameDialogProps) {
  const [name, setName] = useState('');
  const { playlistId, playlistName, close, ...dialogProps } = props;
  const updateName = async () => {
    await renamePlaylist(playlistId, name);
    close();
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Dialog onClose={close} {...dialogProps}>
      <DialogContent>
        <DialogContentText>
          Rename playlist
          {` `}
          {playlistName}
        </DialogContentText>
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={updateName}>Rename</Button>
      </DialogActions>
    </Dialog>
  );
}
