"use client";

import {
  Button,
  Modal,
  PasswordInput,
  ScrollArea,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { closeAddCredentialModal } from "@/store/slices/credentials";
import { Controller, useForm } from "react-hook-form";
import { CredentialType } from "@/types/password-credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialSchema } from "@/lib/schema/credentialSchema";
import { useSession } from "@/lib/auth-client";
import useVault from "@/hooks/use-vault-hook";

const defaultValues: CredentialType = {
  websiteName: "",
  websiteLink: "",
  email: "",
  password: "",
  notes: "",
  username: "",
};

export default function AddNewCredential() {
  const status = useAppSelector(
    (state) => state.credentials.addCredentialModal.status
  );

  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const { encryptionKey } = useVault();

  console.log("encryptionKey", encryptionKey);

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(credentialSchema),
  });

  function handleClose() {
    dispatch(closeAddCredentialModal());
    reset();
  }

  function credentialsSubmitHandler(data: CredentialType) {
    const userId = session?.user.id;

    data.id = userId;

    console.log("Credentials", data);
    handleClose();
  }

  return (
    <Modal
      withCloseButton
      centered
      size={"lg"}
      opened={status}
      onClose={handleClose}
      scrollAreaComponent={ScrollArea.Autosize}
      title={
        <div className="flex flex-col gap-2 ">
          <h2 className="text-heading font-semibold">Add New Password</h2>
          <p className="text-sub-heading font-normal text-sm">
            Enter the details for the new entry
          </p>
        </div>
      }
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(credentialsSubmitHandler)}
      >
        <Controller
          control={control}
          name="websiteName"
          render={({ field }) => {
            return (
              <TextInput
                {...field}
                label="Website Name"
                placeholder="Enter the website name"
                error={errors.websiteName?.message}
                classNames={{
                  label: "dark:text-heading! text-white!",
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="websiteLink"
          render={({ field }) => {
            return (
              <TextInput
                {...field}
                label="Website Link (optional)"
                placeholder="Enter the website link"
                error={errors.websiteLink?.message}
                classNames={{
                  label: "dark:text-heading! text-white!",
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <TextInput
                {...field}
                label="Email address"
                placeholder="Enter email address"
                type="email"
                error={errors.email?.message}
                classNames={{
                  label: "dark:text-heading! text-white!",
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => {
            return (
              <PasswordInput
                {...field}
                label="Password"
                placeholder="Enter password"
                error={errors.password?.message}
                classNames={{
                  label: "dark:text-heading! text-white!",
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="username"
          render={({ field }) => {
            return (
              <TextInput
                {...field}
                label="Username (optional)"
                placeholder="Enter username"
                error={errors.username?.message}
                classNames={{
                  label: "dark:text-heading! text-white!",
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="notes"
          render={({ field }) => {
            return (
              <Textarea
                {...field}
                label="Notes (optional)"
                placeholder="Enter any notes..."
                error={errors.notes?.message}
                autosize
                classNames={{
                  label: "dark:text-heading! text-white!",
                }}
              />
            );
          }}
        />
        <div className="flex p-2 justify-end w-full">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
