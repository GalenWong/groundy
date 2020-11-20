import React from 'react';
import { IconButton, Button, Typography } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RefreshIcon from '@material-ui/icons/Refresh';
import MainContentWindow from './MainContentWindow';
import { getAllDownloads } from '../utils';

export default function Downloaded(): JSX.Element {
  return (
    <MainContentWindow title="Downloaded" content={getAllDownloads}>
      <Button key={1}>
        <Typography variant="caption">Play All</Typography>
        <PlayArrowIcon />
      </Button>
      <Button key={2}>
        <Typography variant="caption">Playlist</Typography>
        <PlaylistAddIcon />
      </Button>
      <IconButton key={3}>
        <RefreshIcon />
      </IconButton>
    </MainContentWindow>
  );
}
