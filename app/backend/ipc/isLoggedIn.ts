import { getToken } from '../authentication';

/**
 * Check Google Account Login Status
 * by trying to get a token
 *
 * @async
 * @returns {Promise<boolean>} - Promise that resolves to a boolean
 */
export default async () => {
  const token = await getToken();
  return token !== null;
};
