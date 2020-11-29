import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Playlist } from '../../types';
import PlaylistComponent from '../Playlist';
import { getYouTubePlaylist } from '../../utils';

interface SearchProps {
  url: string;
}

function parsePlaylistID(url: string): string {
  const m = url.match(/playlist\?list=(.*)/);
  if (m) {
    return m[1];
  }
  return '';
}

export default function SearchPlaylist(props: SearchProps) {
  const { url } = props;
  const [playlist, setPlaylist] = useState<Playlist>({
    id: 'loading',
    name: 'loading',
    songs: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getYouTubePlaylist(parsePlaylistID(url));
      setPlaylist(data);
      setIsLoading(false);
    }
    fetchData();
  }, [url]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <PlaylistComponent songs={playlist.songs} />
  );
}
