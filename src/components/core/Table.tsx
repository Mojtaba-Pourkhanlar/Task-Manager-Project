/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox } from "lucide-react";
import { Button } from "./Button";

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
  onClick: () => void;
};

export default function GlassTable<T>({
  data,
  columns,
  emptyText = "داده‌ای وجود ندارد",
  rowClassName,
  maxHeight,
  onClick,
}: Props<T>) {
  const containerMaxHeight = maxHeight ?? "calc(100vh - 320px)";

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
                <td colSpan={columns.length}>
                  <div className="flex items-center justify-center py-16">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="
                        flex flex-col items-center gap-4
                        px-8 py-6 rounded-2xl
                        bg-white/5 backdrop-blur-lg
                        border border-white/20
                        text-center
                        shadow-lg
                      "
                    >
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/20">
                        <Inbox className="text-white/70" size={28} />
                      </div>

                      <p className="text-white/80 font-semibold text-base">
                        {emptyText}
                      </p>

                      <Button
                        className="
                          bg-emerald-500/40
                          hover:bg-emerald-500/30
                          text-emerald-200
                          border border-emerald-400/20
                          backdrop-blur-md
                          shadow-[0_0_12px_rgba(16,185,129,0.25)]
                          hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]
                          transition-all duration-200
                          font-semibold
                        "
                        onClick={onClick}
                        label={"تسک جدید"}
                        title="تسک جدید"
                        aria-label="ایجاد تسک جدید"
                      />
                    </motion.div>
                  </div>
                </td>
              </tr>
            )}

            <AnimatePresence mode="popLayout">
              {data.map((row, rowIndex) => (
                <motion.tr
                  key={(row as any).id ?? rowIndex}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                    layout: { duration: 0.35 },
                  }}
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
