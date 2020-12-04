import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import NavMenu from './NavMenu';
import LoginButton from '../components/LoginButton';

const drawerWidth = 220;

interface Location {
  pathname: string;
}

export type LayoutProps = React.ComponentProps<'div'>;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  grow: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
    height: 'calc(100% - 80px)',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    minWidth: '300px',
    minHeight: '300px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    margin: '0 0 80px 0',
  },
}));

export default function Layout({ children }: LayoutProps) {
  const classes = useStyles();
  const history = useHistory();
  const currLocation: Location = useLocation();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {currLocation.pathname}
          </Typography>
          <div className={classes.grow} />
          <LoginButton />
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
        <NavMenu />
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
