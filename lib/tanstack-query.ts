import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60_000, // 1 menit
      retry: 2,
      retryDelay: attempt => Math.min(1000 * 2 ** attempt, 10000),
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
      onError: (error, variables, context) => {
        // Global mutation error handler (opsional)
        // console.error(error)
      },
    },
  },
});