import { AnnualHistory } from "@/components/app/history/AnnualHistory";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo("history-year");
}

export default async function DayTasks() {
  return <AnnualHistory />;
}
