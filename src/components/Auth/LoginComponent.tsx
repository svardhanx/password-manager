"use client";

import { loginSchema } from "@/lib/schema/loginSchema";
import { LoginFormFields } from "@/types/formFields";
import { BRAND_NAME } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

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

  async function signInHandler(data: LoginFormFields) {
    console.log("SignIn", data);
    reset();
  }

  return (
    <div className="card-base flex flex-col gap-3 items-center justify-center w-lg p-3">
      <div className="rounded-full bg-primary/15 p-4">
        <KeyRound className="text-primary" />
      </div>
      <section className="flex flex-col items-center justify-center w-full p-2">
        <h2 className="text-2xl text-heading font-bold">{BRAND_NAME}</h2>
        <p className="text-sm text-sub-heading font-normal">
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
                />
              );
            }}
          />
        </div>
        <Button fullWidth type="submit">
          Login
        </Button>
      </form>
      <p className="w-full text-sm text-black text-center">
        <Link href={"/auth/signup"} className="underline text-primary">
          Click here
        </Link>{" "}
        to signup!
      </p>
    </div>
  );
}
