import { NuqsAdapter } from "nuqs/adapters/react";
import { type PropsWithChildren } from "react";

import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </NuqsAdapter>
  );
};

export default Providers;
