"use client";

import React from "react";
import { cls } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "next";
import { TabsStyles as s } from "./core.styles";
export interface Tab {
  key: string;
  href: string;
  label: string;
}

export const Tabs: React.FC<{
  tabs: Tab[];
}> = ({ tabs }) => {
  const pathname = usePathname();

  return (
    <div className={s.container}>
      {tabs.map((t: Tab) => {
        return (
          <Link
            key={t.key}
            href={t.href as Route}
            className={cls(s.href, t.href === pathname ? s.active : s.inactive)}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
};
