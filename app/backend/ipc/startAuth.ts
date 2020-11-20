import { startAuth } from '../authentication';

const authProcess = async () => {
  await startAuth();
};

export default () => {
  authProcess();
};
