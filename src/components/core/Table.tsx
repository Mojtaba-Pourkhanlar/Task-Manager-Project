/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Column<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  emptyText?: string;
  rowClassName?: (item: T) => string;
  maxHeight?: string | number;
};

export default function GlassTable<T>({
  data,
  columns,
  emptyText = "داده‌ای وجود ندارد",
  rowClassName,
  maxHeight,
}: Props<T>) {
  const containerMaxHeight = maxHeight ?? "calc(100vh - 300px)";

  return (
    <div
      className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg overflow-hidden"
      style={{ height: containerMaxHeight }}
    >
      <div className="h-full overflow-auto">
        <table className="w-full text-sm text-white border-collapse">
          <thead className="bg-black/90 sticky top-0 z-10 backdrop-blur-xl">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-right font-semibold border-b border-white/20 ${col.width || ""}`}
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
                  className="text-center py-6 text-gray-300 font-bold text-lg"
                >
                  {emptyText}
                </td>
              </tr>
            )}

            <AnimatePresence mode="popLayout">
              {data.map((row, rowIndex) => (
                <motion.tr
                  key={(row as any).id ?? rowIndex}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`
                    border-b border-white/10
                    transition-colors duration-300
                    ${rowClassName ? rowClassName(row) : ""}
                  `}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`px-4 py-3 ${col.width}`}>
                      {col.render
                        ? col.render(row, rowIndex)
                        : (row as any)[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
