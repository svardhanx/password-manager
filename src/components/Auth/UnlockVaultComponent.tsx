"use client";

import { Button, PasswordInput } from "@mantine/core";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

export default function UnlockVaultComponent() {
  const { control } = useForm({ defaultValues: { master_password: "" } });

  return (
    <div className="card-base flex flex-col gap-3 items-center justify-center w-lg p-3 text-black h-full">
      <div className="rounded-full bg-primary/15 p-4">
        <KeyRound className="text-primary" />
      </div>
      <section className="flex flex-col items-center justify-center w-full p-2">
        <h2 className="text-2xl text-heading font-bold my-2">Vault Locked</h2>
        <p className="text-sm text-sub-heading font-normal">
          Welcome back, USERNAME_HERE
        </p>
        <p className="text-sm text-sub-heading font-normal">
          Enter your Master Password to unlock your vault.
        </p>
      </section>
      <section className="flex flex-col gap-5 items-center justify-center w-full">
        <div className="w-full">
          <Controller
            control={control}
            name="master_password"
            render={({ field }) => {
              return (
                <PasswordInput
                  {...field}
                  placeholder="Enter your master password"
                  label="Master Password"
                  classNames={{ label: "font-medium! my-2!" }}
                />
              );
            }}
          />
        </div>
        <Button fullWidth type="button">
          Unlock Vault
        </Button>
      </section>
      <div className="text-sm flex items-center p-1 justify-center w-full gap-2">
        <span>Not USERNAME_HERE? </span>
        {/* TODO Logout the currently logged in user */}
        <Link
          href={"/auth/login"}
          onClick={() => {}}
          className="text-primary hover:underline underline-offset-3"
        >
          Login with a different account
        </Link>
      </div>
    </div>
  );
}
