import React from 'react';
import ReactJkMusicPlayer, {
  ReactJkMusicPlayerAudioListProps,
  ReactJkMusicPlayerProps,
} from 'react-jinke-music-player';
import { DownloadedSong } from '../../types';
import defaultCover from './default-cover.jpg';
import './player.css';

export interface MusicPlayerProps
  extends Omit<ReactJkMusicPlayerProps, 'audioLists'> {
  songQueue: DownloadedSong[];
}

const transformSongToPlayerSrc = (
  songs: DownloadedSong[]
): ReactJkMusicPlayerAudioListProps[] => {
  return songs.map((song) => ({
    name: song.title,
    musicSrc: `file://${song.filePath}`,
    cover: defaultCover,
  }));
};

/**
 * The Music Player that will be shown at the bottom of the app.
 * Supports queue management like play/pause/next/prev
 * and other conventional player features like volume controls.
 */
export default function MusicPlayer({ songQueue, ...props }: MusicPlayerProps) {
  const audioLists = transformSongToPlayerSrc(songQueue);
  return (
    <ReactJkMusicPlayer
      toggleMode={false}
      mode="full"
      responsive={false}
      showReload={false}
      showDownload={false}
      showLyric={false}
      showThemeSwitch={false}
      remove={false}
      audioLists={audioLists}
      clearPriorAudioLists
      quietUpdate
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
