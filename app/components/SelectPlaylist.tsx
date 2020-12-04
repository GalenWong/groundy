import * as React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { Playlist } from '../types';
import { getAllPlaylists, addSongToPlaylist } from '../utils';

interface SelectPlaylistProps {
  songID: string;
  open: boolean;
  close: () => void;
}

interface State {
  playlists: Playlist[];
  checked: boolean[];
}

/**
 * A Form component that allows users to pick one out of all local playlists.
 * Takes a Song id as input.
 */
const SelectPlaylist = (props: SelectPlaylistProps) => {
  const [state, setState] = React.useState<State>({
    playlists: [],
    checked: [],
  });
  React.useEffect(() => {
    const getData = async () => {
      getAllPlaylists()
        .then((p: Playlist[]) =>
          setState({ playlists: p, checked: p.map(() => false) })
        )
        .catch(() => {});
    };
    getData();
  }, []);
  const { open, close, songID } = props;
  const { playlists, checked } = state;

  const handleChange = (index: number) => {
    const c = Array.from(checked);
    c[index] = !c[index];
    setState({ playlists, checked: c });
  };

  const addSong = () => {
    let i: number;
    for (i = 0; i < playlists.length; i += 1) {
      if (checked[i]) {
        addSongToPlaylist(songID, playlists[i].id);
        console.log(songID, 'added to', playlists[i].name);
      }
    }
    close();
  };

  const formEntry = (playlist: Playlist, index: number) => {
    const checkbox = (
      <Checkbox
        icon={<AddCircleOutlineOutlinedIcon />}
        checkedIcon={<AddCircleOutlinedIcon />}
        checked={checked[index]}
        onChange={() => handleChange(index)}
        name={playlist.name}
      />
    );
    return (
      <FormControlLabel
        key={playlist.id}
        control={checkbox}
        label={playlist.name}
      />
    );
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <DialogContentText>Select playlists to add song to</DialogContentText>
        <FormControl component="fieldset">
          <FormGroup>{playlists.map(formEntry)}</FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={addSong}>OK</Button>
        <Button onClick={close} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectPlaylist;
