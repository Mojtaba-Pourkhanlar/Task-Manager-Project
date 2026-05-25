import { Modal } from "@/components/ui/Modal";
import { Task } from "@/types";
import { useTranslations } from "next-intl";
import { CoreTableStyle as s } from "../app.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const TaskViewModal = ({ isOpen, onClose, task }: Props) => {
  const t = useTranslations("public");

  if (!task) return null;

  const map = {
    low: t("low"),
    medium: t("medium"),
    high: t("high"),
  } as const;

  const colorMap: Record<Task["priority"], string> = {
    high: s.priorityHigh,
    medium: s.priorityMedium,
    low: s.priorityLow,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} header={t("viewTask")}>
      <div className="space-y-4">
        <div>
          <p className="text-md opacity-70 font-bold mb-1">
            {t("tableColumnsTitle")}
          </p>
          <h2 className="text-lg font-bold text-black dark:text-white">
            {task.title}
          </h2>
        </div>

        <hr className="bg-none my-2 border-b-0.5 border-(--navy-300) dark:border-white/20" />
        <div className="flex items-center justify-between ">
          <p className="text-md opacity-70 font-bold">
            {t("tableColumnsPriority")}
          </p>
          <p
            className={`${colorMap[task.priority]} whitespace-nowrap select-none `}
          >
            {map[task.priority]}
          </p>
        </div>

        <hr className="bg-none my-2 border-b-0.5 border-(--navy-300) dark:border-white/20" />

        <div className="flex items-center justify-between ">
          <p className="text-md opacity-70 font-bold">{t("status")}</p>
          <p
            className={`font-bold whitespace-nowrap select-none  ${task.done ? s.priorityLow : s.priorityMedium}`}
          >
            {task.done ? t("done") : t("inprogress")}
          </p>
        </div>

        <hr className="bg-none my-2 border-b-0.5 border-(--navy-300) dark:border-white/20" />

        <div>
          <p className="text-md opacity-70 font-bold mb-1">
            {t("description")}
          </p>
          <p className="text-md font-bold mb-1 text-black dark:text-white">
            {task.description ?? "___"}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default TaskViewModal;
