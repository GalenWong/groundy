import { Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { loginContext } from '../LoginStateWrapper';

export type LoginGuardProps = React.ComponentProps<'div'>;

export default function LoginGuard({ children }: LoginGuardProps) {
  const { isLoggedIn } = useContext(loginContext);
  if (!isLoggedIn) {
    return <Typography>Please log in first!</Typography>;
  }
  return <>{children}</>;
}
