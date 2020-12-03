import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { Progress } from '../types';

export const PROGRESS_RENDERER_EVENT = 'progress-renderer-event';

function useIpcProgresses() {
  const [progresses, setProgresses] = useState<Record<string, Progress>>({});
  useEffect(() => {
    const listener = (_event: Electron.Event, progress: Progress) => {
      setProgresses({ ...progresses, [progress.ytID]: progress });
    };

    ipcRenderer.on(PROGRESS_RENDERER_EVENT, listener);

    return () => {
      ipcRenderer.removeListener(PROGRESS_RENDERER_EVENT, listener);
    };
  }, [progresses]);
  return progresses;
}

export default useIpcProgresses;
