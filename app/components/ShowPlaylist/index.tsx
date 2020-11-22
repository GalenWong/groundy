import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography } from '@material-ui/core';
import { Playlist, Song } from '../../types';
import { getPlaylistInfo } from '../../utils';

export default function ShowPlaylist() {
  const { id }: { id: string } = useParams();
  const [playlist, setPlaylist] = useState<Playlist>({
    id: 'loading',
    name: 'loading',
    songs: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getPlaylistInfo(id);
      setPlaylist(data);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);
  return isLoading ? (
    <CircularProgress color="secondary" />
  ) : (
    <div>
      <Typography>
        ID: &nbsp;
        {id}
      </Typography>
      <Typography>
        Songs:
        <br />
        {playlist.songs.map((song: Song) => song.title).join(', ')}
      </Typography>
    </div>
  );
}
