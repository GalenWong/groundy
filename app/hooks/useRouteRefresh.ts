import { useHistory } from 'react-router-dom';

export default function useRouteRefresh() {
  const history = useHistory();
  const forceRefresh = () => {
    history.push({ pathname: '/empty' });
    history.goBack();
  };
  return forceRefresh;
}
