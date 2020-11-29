import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Song, DownloadedSong } from '../../types';
import PlaylistComponent from '../Playlist';
import { getYouTubeSong } from '../../utils';

interface SearchProps {
  query: string;
}

export default function SearchSong(props: SearchProps) {
  const { query } = props;
  const [song, setSong] = useState<Song | DownloadedSong>({
    title: 'loading',
    channel: 'loading',
    ytID: 'loading',
    downloaded: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getYouTubeSong(query);
      setSong(data);
      setIsLoading(false);
    }
    fetchData();
  }, [query]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <PlaylistComponent songs={[song]} />
  );
}
