import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import ytdl from 'ytdl-core';
import { Song, DownloadedSong } from '../../types';
import PlaylistComponent from '../Playlist';
import { getYouTubeSong } from '../../utils';

interface SearchProps {
  url: string;
}

/**
 * Component that display a song as search result.
 * Take a yt url as input.
 */
export default function SearchSong(props: SearchProps) {
  const { url } = props;
  const [song, setSong] = useState<Song | DownloadedSong>({
    title: 'loading',
    channel: 'loading',
    ytID: 'loading',
    downloaded: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getYouTubeSong(ytdl.getURLVideoID(url));
      setSong(data);
      setIsLoading(false);
    }
    fetchData();
  }, [url]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <PlaylistComponent songs={[song]} />
  );
}
