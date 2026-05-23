"use client";

import React from "react";
import { cls } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "next";
export interface Tab {
  key: string;
  link: string;
  label: string;
}

export const Tabs: React.FC<{
  tabs: Tab[];
}> = ({ tabs }) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:block">
      <div className="flex gap-2 border-tab">
        {tabs.map((t: Tab) => {
          return (
            <Link
              key={t.key}
              href={t.link as Route}
              className={cls(
                "px-4 pt-2.5 pb-1.25 rounded-t-[3px] transition",
                t.link === pathname
                  ? "tabs font-semibold"
                  : "tabs-hover text-(--color-navy-800)",
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
