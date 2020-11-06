import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import MainContentWindow from './MainContentWindow';

export default function Home(): JSX.Element {
  return (
    <>
      <MainContentWindow title="Songs" window="import" />
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
      </div>
    </>
  );
}
