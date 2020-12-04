import React from 'react';
import Recommended from '../components/Recommended';
import LoginGuard from './LoginGuard';

/**
 * Returns the Recommended component
 */
export default function RecommendedPage() {
  return (
    <LoginGuard>
      <Recommended />
    </LoginGuard>
  );
}
