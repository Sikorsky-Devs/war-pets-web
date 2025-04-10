import { NuqsAdapter } from "nuqs/adapters/react";
import { type PropsWithChildren } from "react";

import AuthProvider from "@/providers/auth-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <AuthProvider>{children}</AuthProvider>
    </NuqsAdapter>
  );
};

export default Providers;
