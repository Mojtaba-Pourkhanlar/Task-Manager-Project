import { Route } from "next";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/tasks/day" as Route);
  return null;
}
