"use client";

import SubHeader from "@/components/Common/SubHeader";
import { Pagination, ScrollArea, Select, Skeleton, Table } from "@mantine/core";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { nanoid } from "nanoid";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  noDataText?: string;
  subHeaderTitle?: string;
  subHeaderDescription?: string;
  isLoading: boolean;
  hidePagination?: boolean;
  totalDocs?: number;
  rowsPerPage: string | null;
  setRowsPerPage: Dispatch<SetStateAction<string | null>>;
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
}

export default function DataTable<TData>({
  columns,
  data,
  noDataText,
  subHeaderTitle,
  subHeaderDescription,
  isLoading = false,
  hidePagination = false,
  totalDocs,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
}: Props<TData>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableHeaderGroups = table.getHeaderGroups();

  const tableRows = table.getRowModel().rows;

  const totalNumberOfHeaders = tableHeaderGroups[0].headers.length;

  const skeletonRows = Array(5).fill(0);

  const skeletonColumns = Array(
    totalNumberOfHeaders !== 0 ? totalNumberOfHeaders : 7,
  ).fill(0);

  return (
    <div className="card-base text-black w-full">
      <SubHeader
        title={subHeaderTitle ?? ""}
        description={subHeaderDescription ?? ""}
      />
      {!isLoading && (
        <ScrollArea w={"100%"} scrollbarSize={5} scrollbars="x">
          <Table withTableBorder withRowBorders withColumnBorders>
            <Table.Thead>
              {tableHeaderGroups.map((headerGroup) => {
                const tableHeaders = headerGroup.headers;
                return (
                  <Table.Tr key={headerGroup.id}>
                    {tableHeaders.map((header) => {
                      return (
                        <Table.Th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </Table.Th>
                      );
                    })}
                  </Table.Tr>
                );
              })}
            </Table.Thead>
            <Table.Tbody>
              {tableRows.length > 0 && (
                <>
                  {tableRows.map((row) => {
                    const cells = row.getVisibleCells();
                    return (
                      <Table.Tr key={row.id}>
                        {cells.map((cell) => {
                          return (
                            <Table.Td key={cell.id}>
                              <div>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </div>
                            </Table.Td>
                          );
                        })}
                      </Table.Tr>
                    );
                  })}
                </>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}

      {isLoading && (
        <div className="flex flex-col gap-4 p-2">
          {skeletonRows.map(() => {
            return (
              <div key={nanoid()} className="flex gap-x-4">
                {skeletonColumns.map(() => {
                  return (
                    <Skeleton
                      visible={isLoading}
                      key={nanoid()}
                      height={40}
                      color="red"
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {!isLoading && tableRows.length === 0 && (
        <div className="flex flex-col justify-center items-center w-full mx-auto space-y-3 p-15">
          <Image
            src={"/assets/images/no-data-img.svg"}
            // className="w-60 h-60"
            alt="No data Image"
            width={300}
            height={300}
          />
          <p className="text-sub-heading">{noDataText ?? "No Data"}</p>
        </div>
      )}

      {!hidePagination && (
        <div className="flex items-center justify-between py-3">
          <section className="text-sm ml-1.5 font-medium">
            <span>Results: </span>
            <span className="text-muted-foreground font-bold underline underline-offset-3">
              {totalDocs || tableRows.length} row(s)
            </span>
          </section>
          <section className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              <p className="text-sm text-muted-foreground">Rows per page</p>
              <Select
                data={["5", "10", "20", "30", "40", "50"]}
                value={rowsPerPage}
                onChange={setRowsPerPage}
                classNames={{
                  root: "max-w-[4rem]",
                  dropdown: "text-black!",
                }}
                allowDeselect={false}
              />
            </div>
            <Pagination
              total={10}
              color="primary"
              value={page}
              onChange={setPage}
              disabled={false}
            />
          </section>
        </div>
      )}
    </div>
  );
}
