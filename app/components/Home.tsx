import React from 'react';
import { Link } from 'react-router-dom';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Link to={routes.COUNTER}>to Counter</Link>
      <ReactJkMusicPlayer
        toggleMode={false}
        mode="full"
        responsive={false}
        showReload={false}
        showDownload={false}
        showLyric={false}
        showThemeSwitch={false}
        autoPlay={false}
        audioLists={[
          {
            name: 'My Song',
            musicSrc:
              'file:///Users/galenw/Desktop/Songs/Deca Joins-Go Slow.mp3',
            cover:
              'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
          },
        ]}
        className={styles.player}
      />
    </div>
  );
}
