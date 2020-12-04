import { useEffect, useState } from 'react';
import { isLoggedIn } from '../utils';

/**
 * A hook function to check if a user is logged in
 * it will periodically check the login status
 *
 * @returns {boolean} - whether the user is logged in
 */
function useIsLoggedIn() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const timerId = setInterval(async () => {
      const loginState = await isLoggedIn();
      setLoggedIn(loginState);
    }, 500);

    return () => {
      clearInterval(timerId);
    };
  }, []);
  return loggedIn;
}

export default useIsLoggedIn;
