"use client";

import { useState } from "react";
import useVault from "@/hooks/use-vault-hook";
import { authClientSignOut } from "@/lib/auth-client";
import { BRAND_NAME } from "@/utils/constants";
import { ActionIcon, Button, useMantineColorScheme } from "@mantine/core";
import { KeyRound, LogOut, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const { lockVault } = useVault();

  const { toggleColorScheme, colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

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
      <div className="flex items-center gap-3">
        <ActionIcon
          className="p-1 grid place-items-center cursor-pointer"
          onClick={toggleColorScheme}
          variant="default"
          size="input-md"
          aria-label="Toggle color scheme"
        >
          {colorScheme === "dark" ? (
            <Sun className="shrink-0" />
          ) : (
            <Moon className="shrink-0" size={18} />
          )}
        </ActionIcon>
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
