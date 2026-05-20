"use client";

import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { EMAIL_REGEX, USERNAME_REGEX } from "@/constants";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthFormStyle as s } from "../components/core.styles";

const AuthForm = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const inputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validateEmail = (value: string) => {
    setEmail(value);
    setIsEmailValid(EMAIL_REGEX.test(value));
  };

  const validateUserName = (value: string) => {
    setUserName(value);
    setIsUserNameValid(USERNAME_REGEX.test(value));
  };

  const isDisabled =
    !isUserNameValid ||
    !isEmailValid ||
    userName.trim().length === 0 ||
    email.trim().length === 0;

  const handleClose = () => {
    setUserName("");
    setEmail("");
    router.back();
  };

  const handleAdd = () => {
    handleClose();
  };

  return (
    <div className={s.page}>
      <div className={s.card}>
        <div className={s.headerRow}>
          <button
            onClick={handleClose}
            className={s.backBtn}
            aria-label="بازگشت به صفحه اصلی"
            title="بازگشت"
          >
            <MoveRight size={22} strokeWidth={3} color="#155DFC" />
          </button>
          <h1 className={s.header}>ورود</h1>
        </div>

        <div className="space-y-6 mt-6">
          <TextInput
            id="user-name"
            placeholder={t("userName")}
            value={userName}
            onChange={e => validateUserName(e.target.value)}
            ref={inputRef}
            aria-required="true"
            aria-label={t("userNameAria")}
            aria-describedby="user-name-desc"
            autoComplete="off"
          />
          {!isUserNameValid && (
            <p className="text-red-500 dark:text-red-400 text-xs mb-1 -mt-4 pt-0">
              نام کاربری باید حداقل ۵ کاراکتر و شامل حروف باشد
            </p>
          )}
          <TextInput
            id="email"
            placeholder={t("email")}
            value={email}
            onChange={e => validateEmail(e.target.value)}
            aria-required="true"
            aria-label={t("emailAria")}
            aria-describedby="email-desc"
            autoComplete="off"
          />
        </div>
        <Button
          className={s.submitBtn(isDisabled)}
          onClick={handleAdd}
          label={t("formBTNCreate")}
          disabled={isDisabled}
          title={isDisabled ? t("formBTNCreateTitle") : t("formBTNCreate")}
          aria-label={
            isDisabled ? t("formBTNCreateAria") : t("formBTNCreateAriaConfirm")
          }
        />
      </div>
    </div>
  );
};

export default AuthForm;
