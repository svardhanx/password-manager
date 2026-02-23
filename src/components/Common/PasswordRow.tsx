"use client";

import { useAppDispatch } from "@/hooks/redux-hooks";
import { openViewPasswordModal } from "@/store/slices/credentials";
import { CredentialType } from "@/types/password-credentials";
import { cn } from "@/utils/cn";
import { Eye } from "lucide-react";

export default function PasswordRow({
  original,
  className,
}: {
  original: CredentialType;
  className?: string;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <p className="text-black dark:text-white">●●●●●●●●●●●●</p>
      <div className="p-1 hover:bg-primary hover:text-white transition-all rounded-md">
        <Eye
          size={18}
          onClick={() => dispatch(openViewPasswordModal(original))}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
