import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { clearUserData } from "@/constants";
import { useTranslations } from "next-intl";

interface Props {
  onClose: () => void;
}

const WarrningModal = ({ onClose }: Props) => {
  const t = useTranslations("logout");

  const handleLogout = () => {
    clearUserData();
    onClose();
    window.location.reload();
  };

  return (
    <Modal isOpen={true} onClose={onClose} header={t("modalHeader")}>
      <div className="space-y-4">
        <h2 className="text-lg font-bold mt-4 text-zinc-900 dark:text-zinc-100">
          {t("warningTitle")}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm leading-relaxed">
          {t("warningDesc")}
        </p>

        <div className="flex justify-between gap-3 mt-6">
          <Button
            onClick={onClose}
            label={t("cancelBtn")}
            title={t("cancelBtn")}
            aria-label={t("cancelBtnAria")}
            className="bg-gray-400 dark:bg-gray-600 hover:bg-gray-500"
          />

          <Button
            onClick={handleLogout}
            label={t("confirmBtn")}
            title={t("confirmBtn")}
            aria-label={t("confirmBtnAria")}
            className="bg-red-600 hover:bg-red-700 text-white"
          />
        </div>
      </div>
    </Modal>
  );
};
export default WarrningModal;
