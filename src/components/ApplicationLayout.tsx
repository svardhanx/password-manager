"use client";

import { redirect, usePathname } from "next/navigation";
import Header from "./Header/Header";
import { ReactChildren } from "@/types/react-children-type";
// import { useSession } from "@/lib/auth-client";
// import useVault from "@/hooks/use-vault-hook";

export default function ApplicationLayout({ children }: ReactChildren) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  // const { data: session } = useSession();

  // const { isUnlocked } = useVault();

  // if (session && !isUnlocked) {
  //   redirect("/auth/unlock");
  // }

  if (isAuthRoute) {
    return children;
  }

  return (
    <main className="flex flex-col w-full h-full overflow-hidden">
      <Header />
      <div className="flex-1 overflow-hidden">{children}</div>
    </main>
  );
}
