import { BrowserWindow } from 'electron';
import { throttle } from 'throttle-debounce';
import { ERROR_RENDERER_EVENT } from '../../hooks/useIpcErrorNotify';
import { PROGRESS_RENDERER_EVENT } from '../../hooks/useIpcProgresses';
import { Progress } from '../../types';

let mainWindow: BrowserWindow | null = null;

export const setMainWindow = (main: BrowserWindow) => {
  mainWindow = main;
};

export const notifyError = (error: string) => {
  if (mainWindow) {
    mainWindow.webContents.send(ERROR_RENDERER_EVENT, error);
  }
};

const notifyProgressFunc = (progress: Progress) => {
  if (mainWindow) {
    mainWindow.webContents.send(PROGRESS_RENDERER_EVENT, progress);
  }
};

export const notifyProgress = throttle(300, false, notifyProgressFunc);
