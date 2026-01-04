"use client";

import { useAppDispatch } from "@/hooks/redux-hooks";
import { openAddCredentialModal } from "@/store/slices/credentials";
import { CredentialType } from "@/types/password-credentials";
import DataTable from "@/ui/datatable";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Copy, Ellipsis, Pencil, PlusCircle, Trash } from "lucide-react";
import AddNewCredential from "./AddNewCredential";

const columnHelper = createColumnHelper<CredentialType>();

const columns: ColumnDef<CredentialType>[] = [
  columnHelper.accessor("websiteLink", {
    header: "Website",
  }) as ColumnDef<CredentialType>,
  columnHelper.accessor("websiteName", {
    header: "Website Name",
  }) as ColumnDef<CredentialType>,
  columnHelper.accessor("email", {
    header: "Email",
  }) as ColumnDef<CredentialType>,
  columnHelper.accessor("password", {
    header: "Password",
  }) as ColumnDef<CredentialType>,
  columnHelper.accessor("username", {
    header: "Username",
  }) as ColumnDef<CredentialType>,
  //   columnHelper.accessor("notes", {
  //     header: "Notes",
  //   }) as ColumnDef<CredentialType>,
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="transparent" aria-label="actions">
              <Ellipsis className="text-black" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<Copy size={14} />}>
              Copy Password
            </Menu.Item>
            <Menu.Item leftSection={<Pencil size={14} />}>Edit</Menu.Item>
            <Menu.Item
              leftSection={<Trash size={14} className="text-error" />}
              className="hover:bg-red-200!"
            >
              <span className="text-error">Delete</span>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    },
  }),
];

export const mockCredentials: CredentialType[] = [
  {
    websiteLink: "https://github.com",
    websiteName: "GitHub",
    email: "alice@example.com",
    password: "securePass!2025",
    username: "alice_dev",
    notes: "Personal account, enabled 2FA with authenticator app",
  },
  {
    websiteLink: "https://bankofexample.com",
    websiteName: "Bank of Example",
    email: "john.doe@mainbank.com",
    password: "MyB@nkP@ssw0rd!",
    username: "johndoe123",
    notes: "Main checking account. Use hardware key for login.",
  },
  {
    websiteLink: "https://netflix.com",
    websiteName: "Netflix",
    email: "family@streaming.com",
    password: "StreamFamily2024",
    notes: "Shared family plan. Profile: Kids restricted.",
    // username is optional, so omitted here
  },
];

export default function CredentialsComponent() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-auto flex-col items-center p-4">
      <section className="flex p-2 justify-between w-full">
        <h2 className="font-bold text-2xl text-white">My Credentials</h2>
        <Button
          onClick={() => dispatch(openAddCredentialModal())}
          leftSection={<PlusCircle size={14} />}
        >
          Add New
        </Button>
      </section>
      <DataTable<CredentialType> columns={columns} data={[]} />
      <AddNewCredential />
    </div>
  );
}
