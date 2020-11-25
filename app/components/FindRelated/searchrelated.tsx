import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Song, DownloadedSong } from '../../types';
import PlaylistComponent from '../Playlist';
import { getRelated } from '../../utils';

interface SearchProps {
  query: string;
}

export default function SearchRelated(props: SearchProps) {
  const { query } = props;
  const [songs, setSongs] = useState<(DownloadedSong | Song)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getRelated(query);
      setSongs(data);
      setIsLoading(false);
    }
    fetchData();
  }, [query]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <PlaylistComponent songs={songs} downloads={{}} />
  );
}
