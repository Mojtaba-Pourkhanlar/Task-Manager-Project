import YearTasksClient from "@/components/app/year/YearTasksClient";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo({
    data: {
      title: "Year | Task Manager",
      description: "This app created by Mojtaba Pourkhanlar",
      path: "/year",
    },
  });
}

export default function Page() {
  return <YearTasksClient />;
}
