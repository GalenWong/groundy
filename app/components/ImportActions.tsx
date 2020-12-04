import { shell } from 'electron';
import * as React from 'react';
import {
  CardActions,
  Button,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Progress } from '../types';
import { startDownload } from '../utils/index';

const useStyles = makeStyles({
  fixWidth: {
    minWidth: '180px',
  },
  fillWidth: {
    transform: 'translateX(20%)',
    width: '40%',
  },
  grow: {
    flex: '1',
  },
  tinyFont: {
    fontSize: '.5rem',
    '-webkit-user-select': 'none' /* Safari */,
    '-moz-user-select': 'none' /* Firefox */,
    '-ms-user-select': 'none' /* IE10+/Edge */,
    'user-select': 'none' /* Standard */,
  },
});

interface ImportActionsProps {
  downloaded: boolean;
  progress?: Progress;
  ytid: string;
}

interface State {
  downloading: boolean;
}

const ImportActions = (props: ImportActionsProps) => {
  const [state, setState] = React.useState<State>({ downloading: false });
  const { downloading } = state;
  const classes = useStyles();
  const { downloaded, progress, ytid } = props;

  const youtubeUrl = `https://www.youtube.com/watch?v=${ytid}`;

  let component;
  if (progress === undefined) {
    component = downloading ? (
      <Box className={classes.fillWidth}>
        <Box display="flex">
          <Typography
            className={`${classes.grow} ${classes.tinyFont}`}
            variant="caption"
          />
          <Typography className={classes.tinyFont} variant="caption">
            --%
          </Typography>
        </Box>
        <LinearProgress variant="indeterminate" />
      </Box>
    ) : (
      <Button
        key={2}
        disabled={downloaded}
        onClick={() => {
          startDownload(ytid);
          setState({ downloading: true });
        }}
      >
        <GetAppIcon />
        <Typography>Cache</Typography>
      </Button>
    );
  } else {
    const { current, total } = progress;
    component = (
      <Box className={classes.fillWidth}>
        <Box display="flex">
          <Typography
            className={`${classes.grow} ${classes.tinyFont}`}
            variant="caption"
          />
          <Typography className={classes.tinyFont} variant="caption">
            {`${Number((current * BigInt(100)) / total)}%`}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Number((current * BigInt(100)) / total)}
        />
      </Box>
    );
  }

  return (
    <CardActions className={classes.fixWidth}>
      <Button key={1} onClick={() => shell.openExternal(youtubeUrl)}>
        <Typography variant="caption">Preview</Typography>
      </Button>
      {component}
    </CardActions>
  );
};

export default ImportActions;

ImportActions.defaultProps = {
  progress: undefined,
};
