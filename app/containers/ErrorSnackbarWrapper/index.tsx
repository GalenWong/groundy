import React from 'react';
import useIpcErrorNotify from '../../hooks/useIpcErrorNotify';

/**
 * This is used to wraps all content so that when errors happened,
 * notistack can handle it and show it on the frontend
 */
function ErrorSnackBarWrapper({ children }: React.ComponentProps<'div'>) {
  useIpcErrorNotify();
  return <>{children}</>;
}

export default ErrorSnackBarWrapper;
