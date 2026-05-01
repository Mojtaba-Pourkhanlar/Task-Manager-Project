import { redirect } from "next/navigation";

export default function Home() {
  redirect("/short");
  return null;
}
