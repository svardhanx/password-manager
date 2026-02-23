"use client";

import { useAppDispatch } from "@/hooks/redux-hooks";
import {
  openCredentialModal,
  openDeletePasswordModal,
} from "@/store/slices/credentials";
import { CredentialType } from "@/types/password-credentials";
import { ActionIcon, Menu } from "@mantine/core";
import { Ellipsis, Pencil, Trash } from "lucide-react";

export default function MenuComponent({
  original,
}: {
  original: CredentialType;
}) {
  const dispatch = useAppDispatch();

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          aria-label="actions"
          classNames={{
            icon: "p-1 hover:bg-primary hover:text-white transition-all rounded-md",
          }}
        >
          <Ellipsis className="text-black dark:text-white hover:text-white hover:dark:text-black" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<Pencil size={14} />}
          onClick={() =>
            dispatch(
              openCredentialModal({
                mode: "edit",
                data: original,
              }),
            )
          }
        >
          Edit
        </Menu.Item>
        <Menu.Item
          leftSection={<Trash size={14} className="text-error" />}
          className="hover:bg-red-200!"
          onClick={() => dispatch(openDeletePasswordModal(original))}
        >
          <span className="text-error">Delete</span>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
