import { startAuth } from '../authentication';

/**
 * Start the Auth work
 *
 * @async
 */
const authProcess = async () => {
  await startAuth();
};

export default () => {
  authProcess();
};
