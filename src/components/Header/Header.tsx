"use client";

import useVault from "@/hooks/use-vault-hook";
import { authClientSignOut } from "@/lib/auth-client";
import { BRAND_NAME } from "@/utils/constants";
import { Button } from "@mantine/core";
import { KeyRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const { lockVault } = useVault();

  async function handleSignOut() {
    await authClientSignOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          lockVault();
          router.push("/auth/login");
        },
      },
    });
  }

  return (
    <header className="w-full flex items-center justify-between border-b backdrop-blur px-1.5">
      <div className="rounded-full p-4 flex items-center gap-2">
        <KeyRound className="text-primary" />
        <h3
          className="text-xl font-semibold text-heading cursor-pointer dark:text-white"
          onClick={() => router.push("/")}
        >
          {BRAND_NAME}
        </h3>
      </div>
      <div>
        <Button
          loading={loading}
          leftSection={<LogOut size={16} />}
          onClick={handleSignOut}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
