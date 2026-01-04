"use client";

import { ScrollArea, Table } from "@mantine/core";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  noDataText?: string;
}

export default function DataTable<TData>({
  columns,
  data,
  noDataText,
}: Props<TData>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableHeaderGroups = table.getHeaderGroups();

  const tableRows = table.getRowModel().rows;

  return (
    <div className="card-base text-black w-full">
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
                              header.getContext()
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
                                cell.getContext()
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
      {tableRows.length === 0 && (
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
    </div>
  );
}
