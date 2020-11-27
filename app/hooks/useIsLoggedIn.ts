import { useEffect, useState } from 'react';
import { isLoggedIn } from '../utils';

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
