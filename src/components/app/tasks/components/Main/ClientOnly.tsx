"use client";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  if (!mounted) return null;
  return <>{children}</>;
}
