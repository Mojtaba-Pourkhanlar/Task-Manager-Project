import MonthTasksClient from "@/components/app/month/MonthTasksClient";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo({
    data: {
      title: "Month | Task Manager",
      description: "This app created by Mojtaba Pourkhanlar",
      path: "/month",
    },
  });
}

export default function Page() {
  return <MonthTasksClient />;
}
