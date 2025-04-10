import { PawPrintIcon } from "lucide-react";
import Link from "next/link";

import { Routes } from "@/constants/navigation";

export const Logo = () => (
  <Link href={Routes.Home} className="flex items-center gap-2">
    <div className="rounded-lg bg-primary p-1.5">
      <PawPrintIcon size={18} className="text-secondary" />
    </div>
    <span className="text-lg font-bold">War Paws</span>
  </Link>
);
