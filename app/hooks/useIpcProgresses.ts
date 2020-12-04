import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { Progress } from '../types';

export const PROGRESS_RENDERER_EVENT = 'progress-renderer-event';

/**
 * A hook function to get progresses of downloading songs
 *
 * @returns {Record<string, Progress>} - downloading progresses for songs
 */
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
