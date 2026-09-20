"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { openCredentialModal } from "@/store/slices/credentials";
import { CredentialType } from "@/types/password-credentials";
import { Button, TextInput } from "@mantine/core";
import DataTable from "@/ui/datatable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { LayoutGrid, List, PlusCircle, Search } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useGetUserCredentialsQuery } from "@/hooks/useGetUserCredentialsQuery";
import ViewPasswordModal from "./Modals/ViewPasswordModal";
import { useRouter } from "next/navigation";
import useVault from "@/hooks/use-vault-hook";
import CredentialFormModal from "./Modals/CredentialFormModal";
import DeleteCredentialPopup from "./Modals/DeleteCredentialPopup";
import { useDebouncedState, useOs } from "@mantine/hooks";
import PaginationComponent from "../Common/PaginationComponent";
import PasswordRow from "../Common/PasswordRow";
import MenuComponent from "../Common/MenuComponent";
import CredentialCard from "../Common/CredentialCard";
import { nanoid } from "nanoid";
import { ViewType } from "@/types/view-type";
import { useGetUserSecurityQuery } from "@/hooks/useGetUserSecurityQuery";
import toast from "react-hot-toast";
import { clearPassword } from "@/store/slices/common";
import Link from "next/link";

const columnHelper = createColumnHelper<CredentialType>();

export default function CredentialsComponent() {
  const dispatch = useAppDispatch();

  const { password } = useAppSelector((store) => store.common);

  const os = useOs();

  const [view, setView] = useState<ViewType>(os === "ios" ? "grid" : "table");
  const [rowsPerPage, setRowsPerPage] = useState<string | null>("10");
  const [page, setPage] = useState<number>(1);

  const [search, setSearch] = useDebouncedState("", 400);

  const { data: session } = useSession();

  const { data: userSaltData, dataUpdatedAt: userSaltDataUpdatedAt } =
    useGetUserSecurityQuery(
      { id: session?.user.id },
      Boolean(session?.user.id) && Boolean(password),
    );

  const router = useRouter();

  const { unlockVault } = useVault();

  const userId = session?.user.id;

  // ! GET CREDENTIALS API HERE
  const {
    data: credentialsData,
    dataUpdatedAt: credentialsDataUpdatedAt,
    isFetching: credentialsDataLoading,
    refetch: refetchCredentialsData,
  } = useGetUserCredentialsQuery(
    {
      params: userId!,
      queryParams: {
        page: page,
        limit: rowsPerPage!,
        ...(search && { search }),
      },
    },
    Boolean(userId),
  );

  const totalPages = credentialsData?.data?.totalPages;

  const totalDocs = credentialsData?.data?.totalDocs;

  useEffect(() => {
    if (!userId) return;

    refetchCredentialsData();
  }, [page, rowsPerPage, search, userId, refetchCredentialsData]);

  const credentials = useMemo(() => {
    if (!credentialsDataUpdatedAt) return [] as CredentialType[];

    const credentials = credentialsData?.data?.docs as CredentialType[];

    if (credentials?.length === 0) {
      return [] as CredentialType[];
    }

    return credentials?.map((credential) => ({
      _id: credential?._id,
      // userId: credential.userId,
      websiteLink: credential?.websiteLink,
      websiteName: credential.websiteName,
      email: credential.email,
      password: credential.password,
      username: credential.username,
      notes: credential.notes,
    }));
  }, [credentialsDataUpdatedAt, credentialsData]);

  async function copyEmailAddressToClipboard(email: string) {
    if (email === "" || !email) return;

    await navigator.clipboard.writeText(email);

    toast.success("email address copied");
  }

  const columns: ColumnDef<CredentialType>[] = [
    columnHelper.accessor("websiteLink", {
      header: "Website Link",
      cell: (info) => {
        const websiteLink = info.getValue();

        if (!websiteLink || websiteLink === "") {
          return "---";
        }

        return (
          <Link
            href={websiteLink}
            target="_blank"
            className="cursor-pointer hover:underline"
          >
            {websiteLink}
          </Link>
        );
      },
    }) as ColumnDef<CredentialType>,
    columnHelper.accessor("websiteName", {
      header: "Website Name",
    }) as ColumnDef<CredentialType>,
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => {
        const value = info.getValue();

        return (
          <p
            className="cursor-pointer"
            title="Click to copy"
            onClick={() => copyEmailAddressToClipboard(value)}
          >
            {value ? value : "---"}
          </p>
        );
      },
    }) as ColumnDef<CredentialType>,
    columnHelper.accessor("password", {
      header: "Password",
      cell: (info) => {
        const original = info.row.original;
        return <PasswordRow original={original} />;
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
      cell: (info) => {
        const original = info.row.original;
        return <MenuComponent original={original} />;
      },
    }),
  ];

  useEffect(() => {
    if (!userSaltDataUpdatedAt) return;

    async function unlock() {
      try {
        const key = await unlockVault(password, userSaltData?.salt);
        if (!key) throw new Error("Error generating encryption key");
        router.replace("/credentials");
      } catch (error) {
        console.error("error", error);
        toast.error("Something went wrong. Salt was missing.");
        router.push("/auth/unlock");
      } finally {
        clearPassword();
      }
    }

    unlock();
  }, [
    password,
    router,
    userSaltData?.salt,
    unlockVault,
    userSaltDataUpdatedAt,
  ]);

  return (
    <div className="flex flex-auto flex-col gap-3 items-center p-4">
      <div className="flex flex-col md:flex-row p-2 gap-2 justify-between w-full">
        <h2 className="font-bold text-lg md:text-2xl text-black dark:text-white">
          My Credentials
        </h2>
        <div className="flex gap-2 items-center justify-between">
          <section className="flex items-center gap-1 rounded-md bg-heading p-1">
            <Button
              className="w-fit transition-all"
              size="xs"
              variant={view === "table" ? "primary" : "transparent"}
              onClick={() => setView("table")}
            >
              <List size={18} className="text-heading dark:text-white" />
            </Button>
            <Button
              className="w-fit transition-all"
              size="xs"
              variant={view === "grid" ? "primary" : "transparent"}
              onClick={() => setView("grid")}
            >
              <LayoutGrid size={18} className="text-heading dark:text-white" />
            </Button>
          </section>

          <Button
            onClick={() =>
              dispatch(openCredentialModal({ mode: "create", data: null }))
            }
            leftSection={<PlusCircle size={14} />}
          >
            Add New
          </Button>
        </div>
      </div>

      <TextInput
        defaultValue={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search with website name..."
        className="w-full"
        leftSection={<Search size={18} />}
      />
      {view === "table" && (
        <DataTable<CredentialType>
          columns={columns}
          data={credentials}
          noDataText="Your credentials list is currently empty. Click the 'Add New' button to fill it up."
          isLoading={credentialsDataLoading}
          subHeaderTitle="Credentials"
          subHeaderDescription="A list of all the credentials"
        />
      )}

      {view === "grid" && (
        <div className="w-full flex flex-wrap gap-2 md:grid md:grid-cols-4 md:gap-4 my-2">
          {credentials.map((credential) => (
            <CredentialCard key={nanoid()} credential={credential} />
          ))}
        </div>
      )}

      <PaginationComponent
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalDocs={totalDocs}
        totalPages={totalPages}
        view={view}
      />
      <CredentialFormModal />
      <ViewPasswordModal />
      <DeleteCredentialPopup />
    </div>
  );
}
