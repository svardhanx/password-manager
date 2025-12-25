"use client";

import { usePathname } from "next/navigation";
import Header from "./Header/Header";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

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
