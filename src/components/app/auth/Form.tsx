"use client";

import { Button } from "@/components/core/Button";
import { TextInput } from "@/components/core/TextInput";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Form = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const inputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const isDisabled = userName.trim().length === 0 || email.trim().length === 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClose = () => {
    setUserName("");
    setEmail("");
    router.back();
  };

  const handleAdd = () => {
    handleClose();
  };

  return (
    <>
      <div className="space-y-2">
        <TextInput
          id="user-name"
          placeholder={t("userName")}
          value={userName}
          onChange={e => setUserName(e.target.value)}
          ref={inputRef}
          aria-required="true"
          aria-label={t("userNameAria")}
          aria-describedby="user-name-desc"
          autoComplete="off"
        />
        <TextInput
          id="email"
          placeholder={t("email")}
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-required="true"
          aria-label={t("emailAria")}
          aria-describedby="email-desc"
          autoComplete="off"
        />
      </div>
      <div className="flex justify-between gap-3 mt-7">
        <Button
          className={
            isDisabled
              ? "bg-gray-400 dark:bg-gray-600 w-full"
              : "bg-blue-600 w-full"
          }
          onClick={handleAdd}
          label={t("formBTNCreate")}
          disabled={isDisabled}
          title={isDisabled ? t("formBTNCreateTitle") : t("formBTNCreate")}
          aria-label={
            isDisabled ? t("formBTNCreateAria") : t("formBTNCreateAriaConfirm")
          }
        />
      </div>
    </>
  );
};

export default Form;
