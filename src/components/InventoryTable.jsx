import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const columns = [
  { accessorKey: "guitarModel", header: "Model" },
  { accessorKey: "bodyType", header: "Body Type" },
  { accessorKey: "brandName", header: "Brand" },
  { accessorKey: "stockQuantity", header: "Stock" },
  { accessorKey: "manufacturerName", header: "Manufacturer" },
  { accessorKey: "userRole", header: "Role" },
];

export default function InventoryTable({ items, activeItemId, onSelectRow }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });

  const data = useMemo(() => items, [items]);

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="border border-ink/15 bg-white">
      <div className="flex items-center justify-between border-b border-ink/15 bg-ink px-5 py-3">
        <h2 className="font-display text-lg uppercase tracking-wide text-paper">
          Inventory Registry
        </h2>
      </div>

      {items.length === 0 ? (
        <p className="p-6 text-sm text-ink/50">
          No guitars registered yet. Submit the form above to populate the registry.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-ink/15 bg-paper-dim">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-2 text-left font-mono text-[11px] uppercase tracking-wide text-ink/60"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  const isActive = row.original.id === activeItemId;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => onSelectRow(row.original)}
                      className={`cursor-pointer border-b border-ink/10 transition ${
                        isActive ? "bg-crimson/10" : "hover:bg-paper-dim"
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-2.5 text-ink">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-ink/15 px-5 py-3">
            <span className="font-mono text-xs text-ink/50">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            
            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border border-ink/20 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-ink disabled:opacity-30"
              >
                Previous
              </button>

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="border border-ink bg-ink px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-paper disabled:opacity-30"
              >
                Next
              </button>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
