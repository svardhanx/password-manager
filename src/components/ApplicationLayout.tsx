"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import Header from "./Header/Header";
import { ReactChildren } from "@/types/react-children-type";
import { useSession } from "@/lib/auth-client";
import useVault from "@/hooks/use-vault-hook";
import { useEffect } from "react";

export default function ApplicationLayout({ children }: ReactChildren) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  const router = useRouter();

  const { data: session } = useSession();

  const { isUnlocked } = useVault();

  // console.log("isUnlocked", isUnlocked);

  useEffect(() => {
    if (!session) return;

    if (session && !isUnlocked) {
      router.push("/auth/unlock");
    }
  }, [isUnlocked, session, router]);

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
