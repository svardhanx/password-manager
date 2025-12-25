"use client";

import { BRAND_NAME } from "@/utils/constants";
import { KeyRound } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between border-b backdrop-blur px-1.5">
      <div className="rounded-full p-4 flex items-center gap-2">
        <KeyRound className="text-primary" />
        <h3 className="text-xl font-semibold text-heading">{BRAND_NAME}</h3>
      </div>
      <div>
        <p className="font-bold">TEST</p>
      </div>
    </header>
  );
}
