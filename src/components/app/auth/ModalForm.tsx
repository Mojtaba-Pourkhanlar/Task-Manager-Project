"use client";

import { Modal } from "@/components/core/Modal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Form from "./Form";

const ModalForm = () => {
  const router = useRouter();
  const t = useTranslations("auth");

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} header={t("header")} onClose={handleClose}>
      <Form />
    </Modal>
  );
};

export default ModalForm;
