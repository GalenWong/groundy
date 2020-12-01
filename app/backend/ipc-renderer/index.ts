import { BrowserWindow } from 'electron';
import { ERROR_RENDERER_EVENT } from '../../hooks/useIpcErrorNotify';
import {
  PROGRESS_RENDERER_EVENT,
  PROGRESS_RENDERER_EVENT_COMPLETE,
} from '../../hooks/useIpcProgresses';
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

export const notifyProgress = (progress: Progress) => {
  if (mainWindow) {
    mainWindow.webContents.send(PROGRESS_RENDERER_EVENT, progress);
  }
};

export const notifyComplete = (ytid: string) => {
  if (mainWindow) {
    mainWindow.webContents.send(PROGRESS_RENDERER_EVENT_COMPLETE, ytid);
  }
};
