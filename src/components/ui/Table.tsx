"use client";
import { TableProps, Task } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "./Button";
import { tableStyles as s } from "./core.styles";

export default function GlassTable<T>({
  data,
  columns,
  emptyText = "....",
  rowClassName,
  maxHeight,
  onClick,
}: TableProps<T>) {
  const t = useTranslations("public");

  const containerMaxHeight = maxHeight ?? "calc(100vh - 320px)";

  return (
    <div className={s.wrapper} style={{ height: containerMaxHeight }}>
      <div className="h-full overflow-auto">
        <table className={s.table}>
          <thead className={s.thead}>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className={`${s.th} ${col.width || ""} ${col.align || "text-start"}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex items-center justify-center py-16 ">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={s.emptyWrapper}
                    >
                      <div className={s.emptyIconWrapper}>
                        <Inbox className="text-(--muted)" size={28} />
                      </div>
                      <p className={s.emptyText}>{emptyText}</p>
                      <Button
                        className={s.primaryButton}
                        onClick={onClick}
                        label={t("newTask")}
                        title={t("newTask")}
                        aria-label={t("creatNewTask")}
                      />
                    </motion.div>
                  </div>
                </td>
              </tr>
            )}

            <AnimatePresence mode="popLayout">
              {data.map((row, rowIndex) => (
                <motion.tr
                  key={(row as Task).id ?? rowIndex}
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
                  ${s.row}
                  ${rowClassName ? rowClassName(row) : ""}
                `}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`p-2 ${col.width ?? ""}`}>
                      {col.render
                        ? col.render(row, rowIndex)
                        : col.key
                          ? (row[col.key] as React.ReactNode)
                          : null}
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
