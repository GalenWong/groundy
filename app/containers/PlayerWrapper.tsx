import React from 'react';
import MusicPlayer from '../components/MusicPlayer';

export type PlayerWrapperProps = React.ComponentProps<'div'>;

export default function PlayerWrapper({ children }: PlayerWrapperProps) {
  return (
    <>
      {children}
      <MusicPlayer
        songQueue={[
          {
            title: 'Deca Joins-Go Slow',
            channel: 'deca joins',
            ytID: 'hC8CH0Z3L54',
            downloaded: true,
            filePath: '/Users/galenw/Desktop/Songs/Deca Joins-Go Slow.mp3',
          },
        ]}
      />
    </>
  );
}
