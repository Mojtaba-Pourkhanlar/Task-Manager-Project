import ProfileClient from "@/components/app/profile";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo("profile");
}

export default async function DayTasks() {
  return <ProfileClient />;
}
