/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import { ReactJkMusicPlayerInstance } from 'react-jinke-music-player';
import MusicPlayer from '../../components/MusicPlayer';
import { DownloadedSong } from '../../types';

export type PlayerWrapperProps = React.ComponentProps<'div'>;

export interface PlayerQueueContextObj {
  playSong: (song: DownloadedSong) => void;
  addSongToQueue: (song: DownloadedSong) => void;
  makePlaylistQueue: (songs: DownloadedSong[]) => void;
}

/**
 * to use this context:
 * ```js
 * const controls = React.useContext(playerQueueContext);
 * controls.playSong(song);
 * controls.addSongToQueue(song);
 * controls.makePlaylistQueue(songs);
 * ```
 */
export const playerQueueContext = React.createContext<PlayerQueueContextObj>({
  playSong: () => console.warn('no player context'),
  addSongToQueue: () => console.warn('no player context'),
  makePlaylistQueue: () => console.warn('no player context'),
});

export default function PlayerWrapper({ children }: PlayerWrapperProps) {
  const playerInstanceRef = useRef<ReactJkMusicPlayerInstance>();

  const [playlist, setPlaylist] = useState<DownloadedSong[]>([]);

  const playSong = (song: DownloadedSong) => {
    setPlaylist([song, ...playlist]);
    if (playerInstanceRef.current && playerInstanceRef.current.updatePlayIndex)
      playerInstanceRef.current?.updatePlayIndex(0);
  };

  const addSongToQueue = (song: DownloadedSong) => {
    setPlaylist([...playlist, song]);
  };

  const makePlaylistQueue = (songs: DownloadedSong[]) => {
    setPlaylist(songs);
  };

  const controls: PlayerQueueContextObj = {
    playSong,
    addSongToQueue,
    makePlaylistQueue,
  };

  return (
    <>
      <playerQueueContext.Provider value={controls}>
        {children}
      </playerQueueContext.Provider>
      <MusicPlayer
        songQueue={playlist}
        getAudioInstance={(audio) => {
          playerInstanceRef.current = audio;
        }}
      />
    </>
  );
}
