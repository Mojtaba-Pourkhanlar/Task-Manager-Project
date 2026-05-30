"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import NotTasks from "../tasks/components/Header/NotTasks";
import { useState } from "react";
import WarrningModal from "./WarrningModal";
import { useTranslations } from "next-intl";
import { profileStyles as s } from "./profile.style";
import { Route } from "next";
import { redirect } from "next/navigation";

interface AuthUser {
  userName: string;
  email: string;
}

const ProfileClient = () => {
  const t = useTranslations("logout");
  const [userData] = useLocalStorage<AuthUser | null>("auth_user", null, {
    secure: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initials = userData?.userName
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={s.pageWrapper}>
      <NotTasks name={t("panel")} notTab />

      {!userData ? (
        <div className={`${s.card} ${s.emptyStateWrapper}`}>
          <button
            className={s.signInBtn}
            title={t("sginIn")}
            aria-label={t("signInAria")}
            onClick={() => redirect("/auth" as Route)}
          >
            {t("sginIn")}
          </button>
        </div>
      ) : (
        <div className={s.card}>
          <div className={s.headerFlex}>
            <div className={s.avatar}>{initials}</div>
            <div className={s.infoWrapper}>
              <h2 className={s.nameText}>{userData.userName}</h2>
              <p className={s.emailText}>{userData.email}</p>
            </div>
          </div>

          <div className={s.actionSection}>
            <button
              className={s.logoutBtn}
              onClick={() => setIsModalOpen(true)}
              title={t("logoutBTN")}
              aria-label={t("logoutBTNAria")}
            >
              {t("logoutBTN")}
            </button>
          </div>
        </div>
      )}

      {isModalOpen && <WarrningModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ProfileClient;
