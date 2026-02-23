"use client";

import { Pagination, Select } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface Props {
  totalDocs: number;
  rowsPerPage: string | null;
  setRowsPerPage: Dispatch<SetStateAction<string | null>>;
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  view?: "table" | "grid";
}

export default function PaginationComponent({
  totalDocs,
  rowsPerPage,
  setRowsPerPage,
  totalPages,
  page,
  setPage,
  view = "table",
}: Props) {
  return (
    <div className="flex items-center justify-between py-3 w-full">
      <section className="text-sm ml-1.5 font-medium">
        <span className="text-black dark:text-white">Results: </span>
        <span className="text-muted-foreground dark:text-white font-bold underline underline-offset-3">
          {totalDocs} {view === "table" ? "row(s)" : "item(s)"}
        </span>
      </section>
      <section className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <p className="text-sm text-muted-foreground dark:text-white">
            Rows per page
          </p>
          <Select
            data={["10", "20", "30", "40", "50"]}
            value={rowsPerPage}
            onChange={setRowsPerPage}
            classNames={{
              root: "max-w-[4rem]",
              dropdown: "text-black! dark:text-white!",
            }}
            allowDeselect={false}
          />
        </div>
        <Pagination
          total={totalPages}
          color="primary"
          value={page}
          onChange={setPage}
          disabled={false}
        />
      </section>
    </div>
  );
}
