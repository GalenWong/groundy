import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Playlist } from '../../types';
import PlaylistComponent from '../Playlist';
import { getYouTubePlaylist } from '../../utils';

interface SearchProps {
  query: string;
}

export default function SearchPlaylist(props: SearchProps) {
  const { query } = props;
  const [playlist, setPlaylist] = useState<Playlist>({
    id: 'loading',
    name: 'loading',
    songs: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getYouTubePlaylist(query);
      setPlaylist(data);
      setIsLoading(false);
    }
    fetchData();
  }, [query]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <PlaylistComponent songs={playlist.songs} />
  );
}
