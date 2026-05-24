import { MonthlyHistory } from "@/components/app/history/MonthlyHistory";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo("history-month");
}

export default async function DayTasks() {
  return <MonthlyHistory />;
}
