"use client";

import { Modal } from "@/components/core/Modal";
import { useRouter } from "next/navigation";

export default function AuthModalPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} header="ورود به حساب" onClose={handleClose}>
      <div>فرم لاگین اینجا میاد</div>
    </Modal>
  );
}
