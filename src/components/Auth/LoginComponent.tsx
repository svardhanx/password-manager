"use client";

import { useEffect, useState } from "react";
import useVault from "@/hooks/use-vault-hook";
import { useGetUserSecurityQuery } from "@/hooks/useGetUserSecurityQuery";
import {
  authClientSignIn,
  authClientSignOut,
  useSession,
} from "@/lib/auth-client";
import { loginSchema } from "@/lib/schema/loginSchema";
import { LoginFormFields } from "@/types/form-fields";
import { BRAND_NAME } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { ErrorContext } from "better-auth/react";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginComponent() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormFields>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const [password, setPassword] = useState("");

  const { data: session } = useSession();

  const { data: userSaltData, status } = useGetUserSecurityQuery(
    { id: session?.user.id },
    Boolean(session?.user.id) && Boolean(password),
  );

  const router = useRouter();

  const { unlockVault } = useVault();

  const [loading, setLoading] = useState<boolean>(false);

  async function signInHandler(data: LoginFormFields) {
    await authClientSignIn.email(
      {
        email: data.email,
        password: data.password,
        // rememberMe: false,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          setPassword(data.password);
        },
        onError: (ctx: ErrorContext) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      },
    );
  }

  useEffect(() => {
    if (!userSaltData?.salt || !password || status !== "success") return;

    async function unlock() {
      try {
        const key = await unlockVault(password, userSaltData.salt);

        if (!key) throw new Error("Error generating encryption key");

        router.replace("/credentials");

        setLoading(false);
        reset();
      } catch (error) {
        console.error("error", error);
        toast.error("Something went wrong. Salt was missing.");
        await authClientSignOut();
        setLoading(false);
      } finally {
        setPassword("");
      }
    }

    unlock();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSaltData?.salt, password, status]);

  return (
    <div className="card-base flex flex-col gap-3 items-center justify-center h-full md:h-fit w-lg p-3">
      <div className="rounded-full bg-primary/15 p-4">
        <KeyRound className="text-primary" />
      </div>
      <section className="flex flex-col items-center justify-center w-full p-2">
        <h2 className="text-2xl text-heading dark:text-white font-bold">
          {BRAND_NAME}
        </h2>
        <p className="text-sm text-sub-heading dark:text-white font-normal">
          Securely access your password vault.
        </p>
      </section>
      <form
        className="flex flex-col items-center justify-center gap-3 text-black w-full"
        onSubmit={handleSubmit(signInHandler)}
      >
        <div className="w-full">
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <TextInput
                  {...field}
                  type="email"
                  placeholder="Enter your email address"
                  label="Email"
                  error={errors.email?.message}
                  classNames={{ label: "dark:text-white" }}
                />
              );
            }}
          />
        </div>
        <div className="w-full">
          <Controller
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <PasswordInput
                  {...field}
                  placeholder="Enter your password"
                  label="Password"
                  error={errors.password?.message}
                  classNames={{ label: "dark:text-white" }}
                />
              );
            }}
          />
        </div>
        <Button fullWidth type="submit" loading={loading}>
          Login
        </Button>
      </form>
      <p className="w-full text-sm dark:text-white text-center">
        <Link href={"/auth/signup"} className="underline text-primary">
          Click here
        </Link>{" "}
        to signup!
      </p>
    </div>
  );
}
