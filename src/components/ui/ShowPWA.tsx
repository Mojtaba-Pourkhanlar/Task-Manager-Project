import { useTranslations } from "next-intl";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface PWAProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => void;
}

const ShowPWA = ({ isOpen, onClose, onInstall }: PWAProps) => {
  const t = useTranslations("pwa");

  return (
    <Modal isOpen={isOpen} onClose={onClose} header={t("title")}>
      <p className="font-bold ">{t("description")}</p>

      <p className="font-bold my-5">{t("benefits.fast.desc")}</p>

      <div className="flex justify-between mt-2">
        <Button
          className="bg-gray-400 dark:bg-gray-600"
          onClick={onClose}
          label={t("actions.later")}
          title={t("actions.later")}
          aria-label={t("aria.later")}
        />
        <Button
          label={t("actions.install")}
          title={t("actions.install")}
          aria-label={t("aria.install")}
          onClick={onInstall}
          className="bg-green-600 text-white"
        />
      </div>
    </Modal>
  );
};

export default ShowPWA;
