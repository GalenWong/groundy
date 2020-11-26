import { getToken } from '../authentication';

export default async () => {
  const token = await getToken();
  return token !== null;
};
