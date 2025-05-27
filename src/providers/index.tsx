import { NuqsAdapter } from "nuqs/adapters/react";
import { type PropsWithChildren } from "react";

import AnimationProvider from "@/providers/animation-provider";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <AuthProvider>
          <AnimationProvider>{children}</AnimationProvider>
        </AuthProvider>
      </QueryProvider>
    </NuqsAdapter>
  );
};

export default Providers;
