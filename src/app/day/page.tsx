import DayTasksClient from "@/components/app/day/DayTasksClient";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo({
    data: {
      title: "Day | Task Manager",
      description: "This app created by Mojtaba Pourkhanlar",
      path: "/day",
    },
  });
}

export default async function DayTasks() {
  return <DayTasksClient />;
}
