import { deleteToken } from '../authentication';

/**
 * Log out
 *
 * @async
 */
export default async () => {
  await deleteToken();
};
