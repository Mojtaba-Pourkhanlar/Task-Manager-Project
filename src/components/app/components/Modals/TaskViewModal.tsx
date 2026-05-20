import { Modal } from "@/components/ui/Modal";
import { Task } from "@/types";
import { useTranslations } from "next-intl";
import { coreStyles as s } from "../core.styles";

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
          <p className="text-md opacity-50 font-bold mb-1">
            {t("tableColumnsTitle")}
          </p>
          <h2 className="text-lg font-bold">{task.title}</h2>
        </div>

        <div>
          <p className="text-md opacity-50 font-bold mb-1">{t("status")}</p>
          <p
            className={`font-bold whitespace-nowrap select-none w-fit ${task.done ? s.priorityLow : s.priorityMedium}`}
          >
            {task.done ? t("done") : t("inprogress")}
          </p>
        </div>

        <div>
          <p className="text-md opacity-50 font-bold mb-1">
            {t("tableColumnsPriority")}
          </p>
          <p
            className={`${colorMap[task.priority]} whitespace-nowrap select-none w-fit`}
          >
            {map[task.priority]}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default TaskViewModal;
