import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props { children: React.ReactNode }

export default function QueryProvider({ children }: Props) {
  const clientRef = useRef<QueryClient | null>(null);
  if (clientRef.current === null) {
    clientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60_000,
          retry: 1,
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
    </QueryClientProvider>
  );
}
