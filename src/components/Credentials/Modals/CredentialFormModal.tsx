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
import { closeCredentialModal } from "@/store/slices/credentials";
import { Controller, useForm } from "react-hook-form";
import { CredentialType } from "@/types/password-credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialSchema } from "@/lib/schema/credentialSchema";
import { useSession } from "@/lib/auth-client";
import useVault from "@/hooks/use-vault-hook";
import encryptData from "@/utils/encrypt";
import toast from "react-hot-toast";
import { useAddUserCredentialMutation } from "@/hooks/useAddUserCredentialMutation";
import { useEffect } from "react";
import revealPassword from "@/utils/revealPassword";
import { useUpdateUserCredentialMutation } from "@/hooks/useUpdateUserCredentialMutation";

const defaultValues: CredentialType = {
  websiteName: "",
  websiteLink: "",
  email: "",
  password: "",
  notes: "",
  username: "",
};

export default function CredentialFormModal() {
  const status = useAppSelector(
    (state) => state.credentials.credentialModal.status,
  );

  const helperData = useAppSelector(
    (state) => state.credentials.credentialModal.helperData,
  );

  const credentialMode = helperData?.mode;

  // console.log("helperData", helperData);

  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const { encryptionKey } = useVault();

  // console.log("encryptionKey", encryptionKey);

  const addUserCredentialMutation = useAddUserCredentialMutation();

  const updateUserCredentialMutation = useUpdateUserCredentialMutation();

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CredentialType>({
    defaultValues,
    resolver: zodResolver(credentialSchema),
  });

  function handleClose() {
    dispatch(closeCredentialModal());
    reset();
  }

  async function credentialsSubmitHandler(data: CredentialType) {
    if (!encryptionKey) {
      toast.error("Error while submitting a request");
      return;
    }

    const userId = session?.user.id;

    data.userId = userId;

    // console.log("Credentials", data);

    // return;

    try {
      const encryptedPassword = await encryptData(data.password, encryptionKey);

      const payload = {
        userId: data.userId,
        websiteName: data.websiteName,
        websiteLink: data.websiteLink || "",
        email: data.email,
        password: encryptedPassword,
        username: data.username || "",
        notes: data.notes || "",
        ...(credentialMode === "edit" && { _id: helperData?.data?._id }),
      };

      // console.log("payload", payload);

      // return;

      if (credentialMode === "create") {
        await addUserCredentialMutation.mutateAsync(payload);
      }

      if (credentialMode === "edit") {
        await updateUserCredentialMutation.mutateAsync(payload);
      }

      handleClose();
    } catch (error) {
      console.error("Error requesting a mutation", error);
    }
  }

  useEffect(() => {
    const data = helperData?.data;

    if (!credentialMode || data === null) return;

    (async function () {
      const password = await revealPassword(data?.password, encryptionKey!);
      const resetData = { ...data, password };
      reset(resetData);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentialMode, helperData?.data]);

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
          <h2 className="text-heading dark:text-white font-semibold">
            {credentialMode === "create"
              ? "Add New Password"
              : "Update Password"}
          </h2>
          <p className="text-sub-heading dark:text-white font-normal text-sm">
            {credentialMode === "create"
              ? "Enter the details for the new entry"
              : `Update the details for ${helperData?.data?.websiteName}`}
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
                  label: "dark:text-white! text-heading!",
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
                  label: "dark:text-white! text-heading!",
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
                  label: "dark:text-white! text-heading!",
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
                  label: "dark:text-white! text-heading!",
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
                  label: "dark:text-white! text-heading!",
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
                  label: "dark:text-white! text-heading!",
                }}
              />
            );
          }}
        />
        <div className="flex p-2 justify-end w-full">
          <Button
            type="submit"
            loading={
              addUserCredentialMutation.isPending ||
              updateUserCredentialMutation.isPending
            }
          >
            {credentialMode === "create" ? "Submit" : "Update Entry"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
