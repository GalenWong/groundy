import React from 'react';
import useIpcProgresses from '../../hooks/useIpcProgresses';
import { Progress } from '../../types';

export type ProgressWrapperProps = React.ComponentProps<'div'>;

export interface ProgressContextObj {
  progresses: Record<string, Progress>;
}

export const progressesContext = React.createContext<ProgressContextObj>({
  progresses: {},
});

export default function ProgressWrapper({ children }: ProgressWrapperProps) {
  const progresses = useIpcProgresses();
  return (
    <progressesContext.Provider value={{ progresses }}>
      {children}
    </progressesContext.Provider>
  );
}
