import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import * as endpoints from '../../utils';
import { loginContext } from '../../containers/LoginStateWrapper';

function LoginButton() {
  const { isLoggedIn } = useContext(loginContext);
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
