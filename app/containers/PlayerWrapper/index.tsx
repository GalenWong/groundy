/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

export const duplicateCheck = (
  song: DownloadedSong,
  queue: DownloadedSong[]
): boolean => {
  const hasSameId = queue.findIndex((s) => song.ytID === s.ytID);
  const hasSameSrc = queue.findIndex((s) => song.filePath === s.filePath);
  if (hasSameSrc >= 0 && hasSameId !== hasSameSrc) {
    console.warn(
      'duplicate src detected with different ID',
      queue[hasSameSrc],
      song
    );
  }
  return hasSameSrc >= 0 || hasSameId >= 0;
};

/**
 * Creates a sticky music player bar at the bottom of the app
 */
export default function PlayerWrapper({ children }: PlayerWrapperProps) {
  const playerInstanceRef = useRef<ReactJkMusicPlayerInstance>();

  const [playlist, setPlaylist] = useState<DownloadedSong[]>([]);
  const [playIndex, setPlayIndex] = useState(0);

  // trigger setting play index
  useEffect(() => {
    if (playerInstanceRef.current && playerInstanceRef.current.updatePlayIndex)
      playerInstanceRef.current?.updatePlayIndex(playIndex);
  }, [playIndex]);

  const playSong = useCallback(
    (song: DownloadedSong) => {
      // duplicate check
      if (duplicateCheck(song, playlist)) {
        const index = playlist.findIndex(
          (s) => song.ytID === s.ytID || song.filePath === s.filePath
        );
        setPlayIndex(index);
        return;
      }
      const newPlaylist = [
        ...playlist.slice(0, playIndex + 1),
        song,
        ...playlist.slice(playIndex + 1),
      ];
      setPlaylist(newPlaylist);
      // delay setting playIndex when the state has updated to trigger effect
      setPlayIndex(playIndex + 1);
    },
    [playIndex, playlist]
  );

  const addSongToQueue = (song: DownloadedSong) => {
    // duplicate check
    if (duplicateCheck(song, playlist)) {
      return;
    }
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
        onPlayIndexChange={(i) => setPlayIndex(i)}
      />
    </>
  );
}
