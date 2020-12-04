import { useHistory } from 'react-router-dom';

/**
 * A hook that returns a function that refreshes the current page
 *
 * @returns {func} forceRefresh - a function that can be called to refresh
 */
export default function useRouteRefresh() {
  const history = useHistory();
  const forceRefresh = () => {
    history.push({ pathname: '/empty' });
    history.goBack();
  };
  return forceRefresh;
}
