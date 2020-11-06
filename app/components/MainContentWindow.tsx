import * as React from 'react';
import * as mui from '@material-ui/core';
import Playlist from './Playlist';
import { Progress } from '../types';

const useStyles = mui.makeStyles({
  topbar: {
    display: 'flex',
  },
  fillSpace: {
    flex: '1',
  },
  padded: {
    padding: '10px',
  },
});

const MainContentWindow = (props: { title: string; window: string }) => {
  const classes = useStyles();
  const { title, window } = props;

  const songs = [
    {
      title: 'Fkj & Masego - Tadow',
      channel: 'Fkj',
      ytID: 'hC8CH0Z3L54',
      downloaded: true,
      fileName: 'Fkj & Masego - Tadow-hC8CH0Z3L54.mp3',
    },
    {
      title: 'サカナクション / 新宝島　-New Album「834.194」(6/19 release)-',
      channel: 'NFRecords sakanaction',
      ytID: 'LIlZCmETvsY',
      downloaded: false,
    },
    {
      title: 'Official髭男dism - Pretender［Official Video］',
      channel: 'Official髭男dism',
      ytID: 'TQ8WlA2GXbk',
      downloaded: true,
      fileName:
        'Official髭男dism - Pretender［Official Video］-TQ8WlA2GXbk.mp3',
    },
  ];

  const downloads: Record<string, Progress> = {
    LIlZCmETvsY: {
      ytID: 'LIlZCmETvsY',
      total: BigInt(10000),
      current: BigInt(10000),
      rate: BigInt(-1),
    },
  };

  return (
    <mui.Paper className={classes.padded}>
      <mui.Box className={classes.topbar}>
        <mui.Typography className={classes.fillSpace} variant="h4" noWrap>
          {title}
        </mui.Typography>
        <mui.Typography>Things go here</mui.Typography>
      </mui.Box>
      <Playlist songs={songs} downloads={downloads} window={window} />
    </mui.Paper>
  );
};

export default MainContentWindow;
