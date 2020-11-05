import * as React from 'react';
import { CardActions, Button, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

const ImportActions = (props: { downloaded: boolean }) => {
  const { downloaded } = props;

  return (
    <CardActions>
      <Button key={1}>
        <Typography variant="caption">Preview</Typography>
      </Button>
      <Button
        key={2}
        disabled={!downloaded}
        onClick={() => console.log('cache')}
      >
        <GetAppIcon />
        <Typography>Cache</Typography>
      </Button>
    </CardActions>
  );
};

export default ImportActions;
