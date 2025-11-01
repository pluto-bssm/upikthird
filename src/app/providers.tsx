"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ApolloWrapper } from "@/lib/apollo-provider";

const cache = createCache({ key: "css", prepend: true });

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </QueryClientProvider>
    </CacheProvider>
  );
}
