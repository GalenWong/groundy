import { ipcRenderer } from 'electron';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export const ERROR_RENDERER_EVENT = 'error-renderer-event';

function useIpcErrorNotify() {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const listener = (_event: Electron.Event, errorMsg: string) => {
      enqueueSnackbar(errorMsg, { variant: 'error' });
    };
    ipcRenderer.on(ERROR_RENDERER_EVENT, listener);
    return () => {
      ipcRenderer.removeListener(ERROR_RENDERER_EVENT, listener);
    };
  }, [enqueueSnackbar]);
}

export default useIpcErrorNotify;
