import { CheckCircle2, ListTodo } from "lucide-react";
import { useTranslations } from "next-intl";
import { CoreTableStyle as s } from "../core.styles";

interface Props {
  progress: number;
  total: number;
  doneCount: number;
  handleDonate: () => void;
  progressColor: string;
}

const Progress = ({
  progress,
  doneCount,
  handleDonate,
  total,
  progressColor,
}: Props) => {
  const t = useTranslations("public");
  const tf = useTranslations("footer");

  return (
    <div className={s.progressCard}>
      {/* info row */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-start gap-1 text-blue-600 dark:text-blue-300 font-bold">
          <ListTodo size={16} />
          {t("allTasks")} :
          <span className="mx-2 text-blue-600 dark:text-blue-400 font-bold">
            {" " + total}
          </span>
        </div>

        <div className="flex items-start gap-1 text-green-600 dark:text-green-300 font-bold">
          <CheckCircle2 size={16} />
          {t("isDones")} :
          <span className="mx-2 text-green-600 dark:text-green-400 font-bold">
            {" " + doneCount}
          </span>
        </div>
      </div>

      {/* progress bar */}
      <div className="space-y-1">
        <div className={s.progressLabel}>
          <span>{t("Progress")}</span>
          <span>{progress}%</span>
        </div>

        <div className={s.progressBarBg}>
          <div
            className={`
            h-full rounded-full 
            transition-all duration-500 ease-out
            bg-linear-to-r ${progressColor}
            ${progress === 100 ? "shadow-[0_0_15px_rgba(163,255,119,0.5)]" : ""}
          `}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Donate  */}
      <p
        className="text-sm sm:text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed cursor-pointer"
        title={tf("donate")}
        onClick={handleDonate}
      >
        {tf("text")}
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[14px]
             text-blue-500 font-extrabold
             transition-colors duration-200
             cursor-pointer px-1"
        >
          {tf("coffee")}
          <span aria-hidden>☕</span>
        </button>
        {tf("develop")}
      </p>
    </div>
  );
};

export default Progress;
