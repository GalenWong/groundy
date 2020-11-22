import React from 'react';
import { Link } from 'react-router-dom';
import { Card, IconButton, CardContent, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import routesJSON from '../../constants/routes.json';
import { Playlist } from '../../types';
import Delete from './delete';

interface ListItemProps {
  list: Playlist;
}

interface RoutesObject {
  [index: string]: string;
}
const routes: RoutesObject = routesJSON;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(0),
      margin: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
  })
);

export default function ListItem(props: ListItemProps) {
  const classes = useStyles();
  const { list } = props;
  return (
    <Grid item xs={12}>
      <Card className={classes.listItem}>
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Link to={`${routes['Show Playlist']}/${list.id}`}>
                {list.name}
              </Link>
            </Grid>
            <Grid item>
              {/* <IconButton aria-label="play">
                <PlayArrowIcon />
              </IconButton>
              <IconButton aria-label="rename">
                <TextFieldsIcon />
              </IconButton> */}
              <Grid container>
                <Grid item>
                  <Delete playlistID={list.id} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
