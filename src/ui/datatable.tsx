"use client";

import SubHeader from "@/components/Common/SubHeader";
import { ScrollArea, Skeleton, Table } from "@mantine/core";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { nanoid } from "nanoid";
import Image from "next/image";

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  noDataText?: string;
  subHeaderTitle?: string;
  subHeaderDescription?: string;
  isLoading: boolean;
}

export default function DataTable<TData>({
  columns,
  data,
  noDataText,
  subHeaderTitle,
  subHeaderDescription,
  isLoading = false,
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
                        <Table.Th
                          key={header.id}
                          colSpan={header.colSpan}
                          classNames={{ th: "text-black! dark:text-white!" }}
                        >
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
                      <Table.Tr
                        key={row.id}
                        classNames={{ tr: "text-black! dark:text-white!" }}
                      >
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
            alt="No data Image"
            width={300}
            height={300}
          />
          <p className="text-sub-heading">{noDataText ?? "No Data"}</p>
        </div>
      )}
    </div>
  );
}
