import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/**
 * A conventional React wrapper component
 */
export default function App(props: Props) {
  const { children } = props;
  return <div>{children}</div>;
}
