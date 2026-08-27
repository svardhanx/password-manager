"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import useVault from "@/hooks/use-vault-hook";
import { closeViewPasswordModal } from "@/store/slices/credentials";
import { PasswordStrength } from "@/types/password-strength";
import { checkPasswordStrength } from "@/utils/checkPasswordStrength";
import revealPassword from "@/utils/revealPassword";
import { Button, Modal, PasswordInput, Pill } from "@mantine/core";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const strengthColors: Record<NonNullable<PasswordStrength>, string> = {
  Weak: "bg-red-500! hover:bg-red-500!",
  Medium: "bg-yellow-500! hover:bg-yellow-500!",
  Strong: "bg-green-500! hover:bg-green-500!",
  "Very Strong": "bg-emerald-600! hover:bg-emerald-600!",
};

export default function ViewPasswordModal() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { status, helperData } = useAppSelector(
    (state) => state.credentials.viewPassword,
  );

  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>(null);

  const [decryptedPassword, setDecryptedPassword] = useState<string>("");

  const { encryptionKey, lockVault } = useVault();

  function handleClose() {
    dispatch(closeViewPasswordModal());
  }

  const password = useEffectEvent(async () => {
    try {
      const password = await revealPassword(
        helperData?.password,
        encryptionKey!,
      );

      if (password) setDecryptedPassword(password);

      const { strength } = checkPasswordStrength(password);
      setPasswordStrength(strength);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "error occurred";
      toast.error(errorMessage);
    }
  });

  async function handleCopyPassword() {
    await navigator.clipboard.writeText(decryptedPassword);

    toast.success("Password copied successfully.");

    handleClose();
  }

  function handleReUnlock() {
    lockVault();
    handleClose();
    router.replace("/auth/unlock");
  }

  useEffect(() => {
    if (!status) return;

    (async () => {
      await password();
    })();

    return () => {
      setDecryptedPassword("");
    };
  }, [status]);

  return (
    <Modal
      opened={status}
      onClose={handleClose}
      centered
      withCloseButton
      title={
        <div className="flex flex-col gap-1">
          <h3 className="font-normal text-lg text-heading dark:text-white">
            {helperData?.websiteName}
          </h3>
          <p className="text-sub-heading text-sm font-normal dark:text-white">
            Email: {helperData?.email}
          </p>
        </div>
      }
    >
      {decryptedPassword.length > 0 ? (
        <div className="flex flex-col gap-2">
          <section className="flex items-center justify-between">
            <h3 className="font-normal text-sm text-heading dark:text-white">
              Password
            </h3>
            <Pill
              classNames={{
                root: `text-xs! text-white! ${strengthColors[passwordStrength!]}`,
              }}
            >
              {passwordStrength}
            </Pill>
          </section>
          <PasswordInput readOnly defaultValue={decryptedPassword} />
          <Button
            type="button"
            leftSection={<Copy size={14} />}
            onClick={handleCopyPassword}
          >
            Copy Password
          </Button>
        </div>
      ) : (
        <p className="text-sm dark:text-white text-black text-center py-2">
          Failed to decrypt password.{" "}
          <span className="underline cursor-pointer" onClick={handleReUnlock}>
            Re-unlock
          </span>{" "}
          vault.
        </p>
      )}
    </Modal>
  );
}
