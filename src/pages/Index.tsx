import React from 'react';
import { PrivateRoute } from '@/components/context/PrivateRoute';
import HomePage from './HomePage';

export default function Index() {
  return (
    <PrivateRoute>
      <HomePage />
    </PrivateRoute>
  );
}
