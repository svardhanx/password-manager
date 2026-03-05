"use client";

import { signupSchema } from "@/lib/schema/loginSchema";
import { SignupFormFields } from "@/types/form-fields";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { authClientSignUp } from "../../lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorContext } from "better-auth/react";
import { useRegisterUserMutation } from "@/hooks/useRegisterUserMutation";
import { nanoid } from "nanoid";
import useVault from "@/hooks/use-vault-hook";
import encryptData from "@/utils/encrypt";

const defaultValues = {
  email: "",
  password: "",
  username: "",
};

export default function SignUpComponent() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormFields>({
    defaultValues,
    resolver: zodResolver(signupSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { unlockVault } = useVault();

  const registerMutation = useRegisterUserMutation();

  async function signUpHandler(data: SignupFormFields) {
    // console.log("SignUp", data);

    await authClientSignUp.email(
      {
        name: data.username,
        email: data.email,
        password: data.password,
        callbackURL: "/auth/login",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async (ctx) => {
          // console.log(ctx.data);
          const user = ctx.data.user;
          const salt = nanoid();
          const key = await unlockVault(data.password, salt);
          const encryptedVerifier = await encryptData(user?.id, key);
          // console.log("encryptedVerifier", encryptedVerifier);
          const payload = {
            userId: user?.id as string,
            salt,
            encryptedVerifier,
            kdf: {
              algorithm: "PBKDF2",
              hash: "SHA-256",
              iterations: 100000,
              keyLength: 256,
            },
          };
          await registerMutation.mutateAsync(payload);
          setLoading(false);
          router.push("/auth/login");
        },
        onError: (ctx: ErrorContext) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      },
    );

    reset();
  }

  return (
    <div className="card-base flex flex-col gap-3 items-center justify-center w-lg p-3">
      <div className="rounded-full bg-primary/15 p-4">
        <KeyRound className="text-primary" />
      </div>
      <section className="flex flex-col items-center justify-center w-full p-2">
        <h2 className="text-2xl text-heading dark:text-white font-bold">
          Create Your Vault
        </h2>
        <p className="text-sm text-sub-heading dark:text-white font-normal">
          Choose a strong master password to secure your new vault.
        </p>
      </section>
      <form
        className="flex flex-col items-center justify-center gap-3 text-black w-full"
        onSubmit={handleSubmit(signUpHandler)}
      >
        <div className="w-full">
          <Controller
            control={control}
            name="username"
            render={({ field }) => {
              return (
                <TextInput
                  {...field}
                  placeholder="Enter your username"
                  label="Username"
                  error={errors.username?.message}
                  classNames={{ label: "dark:text-white" }}
                />
              );
            }}
          />
        </div>
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
          Signup
        </Button>
      </form>
      <p className="w-full text-sm text-black dark:text-white text-center">
        Already have an account?{" "}
        <Link href={"/auth/login"} className="underline text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}
