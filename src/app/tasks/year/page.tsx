import YearTasksClient from "@/components/app/tasks/year/YearTasksClient";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo("year");
}
export default function Page() {
  return <YearTasksClient />;
}
