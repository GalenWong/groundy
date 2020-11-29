import React from 'react';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';

export type LoginStateWrapperProps = React.ComponentProps<'div'>;

export interface LoginStateContextObj {
  isLoggedIn: boolean;
}

export const loginContext = React.createContext<LoginStateContextObj>({
  isLoggedIn: false,
});

export default function LoginStateWrapper({
  children,
}: LoginStateWrapperProps) {
  const isLoggedIn = useIsLoggedIn();
  return (
    <loginContext.Provider value={{ isLoggedIn }}>
      {children}
    </loginContext.Provider>
  );
}
