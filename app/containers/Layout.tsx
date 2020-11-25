import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import QueueMusicOutlinedIcon from '@material-ui/icons/QueueMusicOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import routesJSON from '../constants/routes.json';
import PlayerWrapper from './PlayerWrapper';

const drawerWidth = 240;

interface RoutesObject {
  [index: string]: string;
}
const routes: RoutesObject = routesJSON;

const icons: JSX.Element[] = [
  <HomeIcon key="home" />,
  <QueueMusicOutlinedIcon key="all" />,
  <CloudDownloadOutlinedIcon key="downloaded" />,
  <SearchOutlinedIcon key="find" />,
  <WhatshotOutlinedIcon key="recommended" />,
  <SettingsOutlinedIcon key="setting" />,
];

interface Location {
  pathname: string;
}

export type LayoutProps = React.ComponentProps<'div'>;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: 'calc(100% - 80px)',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    margin: '0 0 80px 0',
  },
}));

export default function Layout({ children }: LayoutProps) {
  const classes = useStyles();
  const routesArray = Object.keys(routes);
  const currLocation: Location = useLocation();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {currLocation.pathname}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {routesArray
            .filter((name: string) => !['Show Playlist'].includes(name))
            .map((name: string, index: number) => (
              <ListItem
                key={name}
                button
                component={Link}
                to={`${routes[name]}`}
              >
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
