import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import QueueMusicOutlinedIcon from '@material-ui/icons/QueueMusicOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import YoutubeSearchedForSharpIcon from '@material-ui/icons/YoutubeSearchedForSharp';
import routesJSON from '../constants/routes.json';

interface RoutesObject {
  [index: string]: string;
}
const routes: RoutesObject = routesJSON;

/**
 * All the icons for all pages
 * to be shown on the navigation menu bar
 */
const icons: JSX.Element[] = [
  <HomeIcon key="home" />,
  <QueueMusicOutlinedIcon key="all" />,
  <CloudDownloadOutlinedIcon key="downloaded" />,
  <SearchOutlinedIcon key="findsong" />,
  <YoutubeSearchedForSharpIcon key="findplaylist" />,
  <WhatshotOutlinedIcon key="recommended" />,
  <SettingsOutlinedIcon key="setting" />,
];

/**
 * Returns the NavMenu component
 * that's on the left of the screen
 * providing navigations to all pages
 */
export default function NavMenu() {
  const routesArray = Object.keys(routes);
  return (
    <List>
      {routesArray
        .filter(
          (name: string) => !['Show Playlist', 'Find Related'].includes(name)
        )
        .map((name: string, index: number) => (
          <ListItem key={name} button component={Link} to={`${routes[name]}`}>
            <ListItemIcon>{icons[index]}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
    </List>
  );
}
