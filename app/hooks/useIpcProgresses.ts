import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { Progress } from '../types';

export const PROGRESS_RENDERER_EVENT = 'progress-renderer-event';
export const PROGRESS_RENDERER_EVENT_COMPLETE =
  'progress-renderer-event-complete';

function useIpcProgresses() {
  const [progresses, setProgresses] = useState<Record<string, Progress>>({});
  useEffect(() => {
    const listener = (_event: Electron.Event, progress: Progress) => {
      setProgresses({ ...progresses, [progress.ytID]: progress });
    };

    const remove = (_event: Electron.Event, ytID: string) => {
      const copy = { ...progresses };
      delete copy[ytID];
      setProgresses({ ...copy });
    };

    ipcRenderer.on(PROGRESS_RENDERER_EVENT, listener);
    ipcRenderer.on(PROGRESS_RENDERER_EVENT_COMPLETE, remove);

    return () => {
      ipcRenderer.removeListener(PROGRESS_RENDERER_EVENT, listener);
      ipcRenderer.removeListener(PROGRESS_RENDERER_EVENT_COMPLETE, remove);
    };
  }, [progresses]);
  return progresses;
}

export default useIpcProgresses;
