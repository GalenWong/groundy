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
}

const ImportActions = (props: ImportActionsProps) => {
  const classes = useStyles();
  const { downloaded, progress } = props;

  let component;
  if (typeof progress === 'undefined') {
    component = (
      <Button key={2} disabled={downloaded}>
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
      <Button key={1}>
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
