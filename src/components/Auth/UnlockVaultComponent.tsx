"use client";

import { useAppDispatch } from "@/hooks/redux-hooks";
import useVault from "@/hooks/use-vault-hook";
import { useGetUserSecurityQuery } from "@/hooks/useGetUserSecurityQuery";
import { authClientSignOut, useSession } from "@/lib/auth-client";
import { setPassword } from "@/store/slices/common";
import decryptData from "@/utils/decrypt";
import { Button, PasswordInput } from "@mantine/core";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function UnlockVaultComponent() {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { master_password: "" },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { unlockVault } = useVault();

  async function handleSignOut() {
    await authClientSignOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  }

  const { data: session } = useSession();

  const user = session?.user;

  const { data: userSaltData, isError: userSaltDataIsError } =
    useGetUserSecurityQuery({ id: user?.id }, Boolean(user?.id));

  async function unlockVaultHandler(data: { master_password: string }) {
    setLoading(true);

    const password = data.master_password;

    dispatch(setPassword(password));

    try {
      const key = await unlockVault(password, userSaltData?.salt);

      await decryptData(userSaltData?.encryptedVerifier, key);

      router.replace("/credentials");
    } catch (error) {
      console.error("Error decrypting", error);
      toast.error("Incorrect password");
      if (userSaltDataIsError) {
        toast.error("Error - cannot unlock vault.");
      }
    } finally {
      setLoading(false);
      reset();
    }
  }

  return (
    <div className="card-base flex flex-col gap-3 items-center justify-center w-lg p-3 text-black">
      <div className="rounded-full bg-primary/15 p-4">
        <KeyRound className="text-primary" />
      </div>
      <section className="flex flex-col items-center justify-center w-full p-2">
        <h2 className="text-2xl text-heading dark:text-white font-bold my-2">
          Vault Locked
        </h2>
        <p className="text-sm text-sub-heading dark:text-white font-normal">
          Welcome back, {user?.name}
        </p>
        <p className="text-sm text-sub-heading dark:text-white font-normal">
          Enter your Master Password to unlock your vault.
        </p>
      </section>
      <form
        className="flex flex-col gap-5 items-center justify-center w-full"
        onSubmit={handleSubmit(unlockVaultHandler)}
      >
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
                  classNames={{ label: "font-medium! my-2! dark:text-white" }}
                />
              );
            }}
          />
        </div>
        <Button fullWidth type="submit" loading={loading}>
          Unlock Vault
        </Button>
      </form>
      <div className="text-sm flex items-center p-1 justify-center w-full gap-2">
        <span>Not {user?.name}? </span>
        <p
          onClick={handleSignOut}
          className="text-primary hover:underline underline-offset-3"
        >
          Login with a different account
        </p>
      </div>
    </div>
  );
}
