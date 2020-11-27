/* This is where our backend endpoint functions go */

import { ipcRenderer } from 'electron';
import { BackendEndpoints } from '../backend/ipc';

const isLoggedIn = async (): Promise<boolean> => {
  return ipcRenderer.invoke(BackendEndpoints.IS_LOGGED_IN);
};

const startAuth = async () => {
  await ipcRenderer.invoke(BackendEndpoints.START_AUTH);
};

const logout = async () => {
  await ipcRenderer.invoke(BackendEndpoints.LOG_OUT);
};

export { isLoggedIn, startAuth, logout };

// using mock right now
export * from './mocks';
