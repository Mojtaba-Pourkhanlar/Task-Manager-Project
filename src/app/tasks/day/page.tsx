import DayTasksClient from "@/components/app/tasks/day/DayTasksClient";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo("day");
}

export default async function DayTasks() {
  return <DayTasksClient />;
}
