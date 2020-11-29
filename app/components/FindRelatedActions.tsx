import React from 'react';
import { Link } from 'react-router-dom';
import { CardActions, IconButton } from '@material-ui/core';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { DownloadedSong, Song } from '../types';
import routesJSON from '../constants/routes.json';

interface RoutesObject {
  [index: string]: string;
}
const routes: RoutesObject = routesJSON;

interface FindRelatedActionProps {
  song: Song | DownloadedSong;
}

const FindRelatedActions = (props: FindRelatedActionProps) => {
  const { song } = props;
  return (
    <CardActions>
      <IconButton
        key={3}
        component={Link}
        to={`${routes['Find Related']}/${song.ytID}`}
      >
        <LocationSearchingIcon />
      </IconButton>
    </CardActions>
  );
};

export default FindRelatedActions;
