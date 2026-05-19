import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useTranslations } from "next-intl";
import { DailyHistory } from "./DailyHistory";

interface HistoryItem {
  date: string;
  total: number;
  done: number;
}

const HistoryModal = ({
  data,
  onClose,
}: {
  data: HistoryItem[];
  onClose: () => void;
}) => {
  const t = useTranslations("public");

  return (
    <Modal isOpen={true} onClose={onClose} header={t("history")}>
      {/* Render tab content */}
      <DailyHistory data={data} />

      <Button
        onClick={onClose}
        title={t("Iunderstand")}
        label={t("Iunderstand")}
        aria-label={t("ariaLableIunderstand")}
        className="bg-gray-900 dark:bg-gray-600 w-full hover:bg-gray-800 dark:hover:bg-gray-500 mt-6"
      />
    </Modal>
  );
};

export default HistoryModal;
