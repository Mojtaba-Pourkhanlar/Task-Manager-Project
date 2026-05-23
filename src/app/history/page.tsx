import { Route } from "next";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/history/day" as Route);
  return null;
}
