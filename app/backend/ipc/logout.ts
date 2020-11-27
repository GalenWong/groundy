import { deleteToken } from '../authentication';

export default async () => {
  await deleteToken();
};
