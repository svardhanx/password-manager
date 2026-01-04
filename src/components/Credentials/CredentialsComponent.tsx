"use client";

import { useAppDispatch } from "@/hooks/redux-hooks";
import {
  openAddCredentialModal,
  openViewPasswordModal,
} from "@/store/slices/credentials";
import { CredentialType } from "@/types/password-credentials";
import DataTable from "@/ui/datatable";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Copy, Ellipsis, Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import AddNewCredential from "./AddNewCredential";
import { useSession } from "@/lib/auth-client";
import { useGetUserCredentialsQuery } from "@/hooks/useGetUserCredentialsQuery";
import { useMemo } from "react";
import ViewPasswordModal from "./Modals/ViewPasswordModal";

const columnHelper = createColumnHelper<CredentialType>();

export default function CredentialsComponent() {
  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const userId = session?.user.id;

  const { data: credentialsData, dataUpdatedAt: credentialsDataUpdatedAt } =
    useGetUserCredentialsQuery({ userId: userId });

  const credentials = useMemo(() => {
    if (!credentialsDataUpdatedAt) return [] as CredentialType[];
    console.log("credentialsData", credentialsData);

    const credentials = credentialsData?.data as CredentialType[];

    if (credentials?.length === 0) {
      return [] as CredentialType[];
    }

    return credentials?.map((credential) => ({
      id: credential.userId,
      websiteLink: credential?.websiteLink,
      websiteName: credential.websiteName,
      email: credential.email,
      password: credential.password,
      username: credential.username,
      notes: credential.notes,
    }));
  }, [credentialsDataUpdatedAt, credentialsData]);

  const columns: ColumnDef<CredentialType>[] = [
    columnHelper.accessor("websiteLink", {
      header: "Website Link",
      cell: (info) => {
        const websiteLink = info.getValue();

        if (!websiteLink || websiteLink === "") {
          return "---";
        }

        return websiteLink;
      },
    }) as ColumnDef<CredentialType>,
    columnHelper.accessor("websiteName", {
      header: "Website Name",
    }) as ColumnDef<CredentialType>,
    columnHelper.accessor("email", {
      header: "Email",
    }) as ColumnDef<CredentialType>,
    columnHelper.accessor("password", {
      header: "Password",
      cell: (info) => {
        const original = info.row.original;
        return (
          <div className="flex items-center gap-2">
            <p className="text-black">●●●●●●●●●●●●</p>
            <div className="p-1 hover:bg-primary hover:text-white transition-all rounded-md">
              <Eye
                size={18}
                onClick={() => dispatch(openViewPasswordModal(original))}
                className="cursor-pointer"
              />
            </div>
          </div>
        );
      },
    }) as ColumnDef<CredentialType>,
    columnHelper.accessor("username", {
      header: "Username",
      cell: (info) => {
        const username = info.getValue();

        if (!username || username === "") {
          return "---";
        }

        return username;
      },
    }) as ColumnDef<CredentialType>,
    columnHelper.accessor("notes", {
      header: "Notes",
      cell: (info) => {
        const notes = info.getValue();

        if (!notes || notes === "") {
          return "---";
        }

        return notes;
      },
    }) as ColumnDef<CredentialType>,
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: () => {
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
                <Ellipsis className="text-black hover:text-white" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Item leftSection={<Copy size={14} />}>
                Copy Password
              </Menu.Item> */}
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
      <DataTable<CredentialType>
        columns={columns}
        data={credentials}
        noDataText="Your credentials list is currently empty. Click the 'Add New' button to fill it up."
      />
      <AddNewCredential />
      <ViewPasswordModal />
    </div>
  );
}
