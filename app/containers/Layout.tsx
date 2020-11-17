import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import QueueMusicOutlinedIcon from '@material-ui/icons/QueueMusicOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import routesJSON from '../constants/routes.json';

const drawerWidth = 240;

interface RoutesObject {
  [index: string]: string;
}
const routes: RoutesObject = routesJSON;
// const icons = [
//   () => <CloudDownloadOutlinedIcon />,
//   () => <QueueMusicOutlinedIcon />,
//   () => <SearchOutlinedIcon />,
//   () => <WhatshotOutlinedIcon />,
// ];
const icons: JSX.Element[] = [
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
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: 'calc(100% - 80px)',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Layout({ children }: LayoutProps) {
  const routesArray = Object.keys(routes);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const currLocation: Location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {currLocation.pathname}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {routesArray.map((name: string, index: number) => (
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

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    </div>
  );
}
