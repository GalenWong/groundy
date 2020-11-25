import React from 'react';
import { Button } from '@material-ui/core';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import * as endpoints from '../../utils';

function LoginButton() {
  const isLoggedIn = useIsLoggedIn();
  const login = async () => {
    await endpoints.startAuth();
  };
  const logout = async () => {
    await endpoints.logout();
  };
  const text = isLoggedIn ? 'Log out' : 'Log in';
  const action = isLoggedIn ? logout : login;

  return <Button onClick={action}>{text}</Button>;
}

export default LoginButton;
