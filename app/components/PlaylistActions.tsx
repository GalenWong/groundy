import * as React from 'react';

import { CardActions, IconButton } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueIcon from '@material-ui/icons/Queue';

const PlaylistActions = () => {
  return (
    <CardActions>
      <IconButton key={1}>
        <PlayArrowIcon />
      </IconButton>
      <IconButton key={2}>
        <QueueIcon />
      </IconButton>
      <IconButton key={3}>
        <PlaylistAddIcon />
      </IconButton>
      <IconButton key={4}>
        <ClearIcon />
      </IconButton>
    </CardActions>
  );
};

export default PlaylistActions;
