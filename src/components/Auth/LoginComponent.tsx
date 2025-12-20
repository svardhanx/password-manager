"use client";

import { LoginFormFields } from "@/types/formFields";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { KeyRound } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginComponent() {
  const { control } = useForm<LoginFormFields>({ defaultValues });

  return (
    <div className="card-base flex flex-col gap-3 items-center justify-center w-lg p-3">
      <div className="rounded-full bg-primary/15 p-4">
        <KeyRound className="text-primary" />
      </div>
      <section className="flex flex-col items-center justify-center w-full p-2">
        <h2 className="text-2xl text-heading font-bold">Vault</h2>
        <p className="text-sm text-sub-heading font-normal">
          Securely access your password vault.
        </p>
      </section>
      <section className="flex flex-col items-center justify-center gap-3 text-black w-full">
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
                />
              );
            }}
          />
        </div>
        <Button fullWidth>Login</Button>
      </section>
    </div>
  );
}
