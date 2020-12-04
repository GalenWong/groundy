import { BrowserWindow } from 'electron';
import { ERROR_RENDERER_EVENT } from '../../hooks/useIpcErrorNotify';
import { PROGRESS_RENDERER_EVENT } from '../../hooks/useIpcProgresses';
import { Progress } from '../../types';

let mainWindow: BrowserWindow | null = null;

/**
 * Set the main window
 *
 * @param {BrowserWindow} main - the main browser window
 */
export const setMainWindow = (main: BrowserWindow) => {
  mainWindow = main;
};

/**
 * Notify error with useIpcErrorNotify hook
 *
 * @param {string} error - the error message
 */
export const notifyError = (error: string) => {
  if (mainWindow) {
    mainWindow.webContents.send(ERROR_RENDERER_EVENT, error);
  }
};

/**
 * Notify progress with useIpcProgresses hook
 *
 * @param {Progress} progress - the progress
 */
export const notifyProgress = (progress: Progress) => {
  if (mainWindow) {
    mainWindow.webContents.send(PROGRESS_RENDERER_EVENT, progress);
  }
};
