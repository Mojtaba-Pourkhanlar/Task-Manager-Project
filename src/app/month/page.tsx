import MonthTasksClient from "@/components/app/month/MonthTasksClient";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo("month");
}

export default function Page() {
  return <MonthTasksClient />;
}
