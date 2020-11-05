import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function Siderbar() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to={routes.ALLPLAYLISTS}>All Playlists</Link>
      </li>
      <li>
        <Link to={routes.DOWNLOADED}>Downloaded</Link>
      </li>
      <li>
        <Link to={routes.FINDRELATED}>Find Related</Link>
      </li>
      <li>
        <Link to={routes.RECOMMENDED}>Recommended</Link>
      </li>
    </ul>
  );
}
