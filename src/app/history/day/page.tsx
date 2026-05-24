import { DailyHistory } from "@/components/app/history/DailyHistory";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo("history-day");
}

export default async function DayTasks() {
  return <DailyHistory />;
}
