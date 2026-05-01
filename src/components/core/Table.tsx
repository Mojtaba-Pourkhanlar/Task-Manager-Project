/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

type Column<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  emptyText?: string;
};

export default function GlassTable<T>({
  data,
  columns,
  emptyText = "داده‌ای وجود ندارد",
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg">
      <table className="w-full text-sm text-white">
        <thead className="bg-white/10">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 text-right font-semibold border-b border-white/20"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-300"
              >
                {emptyText}
              </td>
            </tr>
          )}

          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-white/10 hover:bg-white/5 transition"
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-3 ${col.className || ""}`}
                >
                  {col.render
                    ? col.render(row, rowIndex)
                    : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
