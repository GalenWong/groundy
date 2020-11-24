import React from 'react';
import useIpcErrorNotify from '../../hooks/useIpcErrorNotify';

function ErrorSnackBarWrapper({ children }: React.ComponentProps<'div'>) {
  useIpcErrorNotify();
  return <>{children}</>;
}

export default ErrorSnackBarWrapper;
