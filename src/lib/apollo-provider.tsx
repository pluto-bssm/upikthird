"use client";

import { ApolloProvider } from '@apollo/client/react';
import apolloClient from './apollo-client';
import React from 'react';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}
