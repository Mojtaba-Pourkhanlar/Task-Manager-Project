import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface Props {
  count: number;
  onConfirm: () => void;
  onDiscard: () => void;
}

const DailyReviewModal = ({ count, onConfirm, onDiscard }: Props) => {
  const t = useTranslations("public");
  const path = usePathname();

  return (
    <Modal isOpen={true} onClose={onDiscard} header={t("dailyTask")}>
      <div className="space-y-4">
        <h2 className="text-lg font-bold mt-4 ">
          {path === "/tasks/day/" ? t("dailyDesc") : t("monthlyDesc")}
          <span className="font-bold text-orange-500"> {count} </span>
          {t("dailyDescSec")}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-7">
          {path === "/tasks/day/" ? t("dailyDescLast") : t("monthlyDescLast")}
        </p>

        <div className="flex justify-between gap-3 mt-5">
          <Button
            onClick={onDiscard}
            label={t("reviewDiscard")}
            title={t("reviewDiscardTitle")}
            aria-label={t("reviewDiscardAria")}
            className="bg-gray-400 dark:bg-gray-600"
          />

          <Button
            onClick={onConfirm}
            label={t("reviewConfirm")}
            title={t("reviewConfirmTitle")}
            aria-label={t("reviewConfirmAria")}
            className="bg-green-700 hover:bg-green-800"
          />
        </div>
      </div>
    </Modal>
  );
};
export default DailyReviewModal;
