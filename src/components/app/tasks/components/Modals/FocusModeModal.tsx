"use client";

import { Modal } from "@/components/ui/Modal";
import { Rocket, X } from "lucide-react";
import { useState, useId } from "react";
import { useTranslations } from "next-intl";
import { FocusModeModalProps, TimeFieldProps } from "@/types";
import { useLocaleStore } from "@/store/locale";

export default function FocusModeModal({
  taskTitle,
  onStart,
  onClose,
}: FocusModeModalProps) {
  const t = useTranslations("focus.FocusMode");
  const { locale } = useLocaleStore();

  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  const hoursId = useId();
  const minutesId = useId();

  const handleStart = () => {
    const total = hours * 3600 + minutes * 60;
    if (total <= 0) return;
    onStart(total);
  };

  return (
    <Modal isOpen onClose={onClose} header={t("header")}>
      <div className="flex flex-col items-center gap-8 py-2 select-none">
        <div
          className="w-full bg-slate-100/50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-center space-y-1 backdrop-blur-sm"
          aria-labelledby="task-info-label"
        >
          <p
            id="task-info-label"
            className="text-slate-800 dark:text-white font-bold text-base leading-relaxed"
          >
            {t("taskLabel", { title: taskTitle })}
          </p>
          <p className="text-slate-500 dark:text-white/40 text-xs font-medium">
            {t("subTitle")}
          </p>
        </div>

        <div
          className={`flex items-center justify-center gap-6 relative ${locale === "fa" ? "flex-row-reverse" : "flex-row"}`}
          role="group"
          aria-label={t("header")}
        >
          <TimeField
            id={hoursId}
            label={t("hours")}
            value={hours}
            min={0}
            max={23}
            onChange={setHours}
          />

          <div className="flex flex-col gap-2 mt-6" aria-hidden="true">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-75" />
          </div>

          <TimeField
            id={minutesId}
            label={t("minutes")}
            value={minutes}
            min={0}
            max={59}
            onChange={setMinutes}
          />
        </div>

        <div className="flex gap-4 w-full pt-2">
          <button
            onClick={onClose}
            aria-label={t("cancel")}
            className="cursor-pointer group flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-red-500 transition-all duration-300 text-sm font-semibold"
          >
            <X
              size={16}
              className="group-hover:rotate-90 transition-transform"
              aria-hidden="true"
            />
            <span>{t("cancel")}</span>
          </button>

          <button
            onClick={handleStart}
            disabled={hours === 0 && minutes === 0}
            aria-label={t("start")}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-linear-to-br from-violet-600 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100"
          >
            <Rocket size={18} aria-hidden="true" />
            <span>{t("start")}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

function TimeField({ id, label, value, min, max, onChange }: TimeFieldProps) {
  const inc = () => onChange(Math.min(max, value + 1));
  const dec = () => onChange(Math.max(min, value - 1));

  return (
    <div className="flex flex-col items-center gap-3">
      <label
        htmlFor={id}
        className="text-[12px] uppercase tracking-widest font-bold text-slate-400 dark:text-white/30"
      >
        {label}
      </label>

      <div className="flex flex-col items-center gap-2">
        <div
          id={id}
          className="w-20 h-16 pt-2 flex items-center justify-center text-3xl font-black bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white"
        >
          {value.toString().padStart(2, "0")}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={inc}
            aria-label={`increase ${label}`}
            className="w-10 h-10 rounded-xl bg-blue-500/80 text-white text-lg font-bold cursor-pointer"
          >
            +
          </button>
          <button
            type="button"
            onClick={dec}
            aria-label={`decrease ${label}`}
            className="w-10 h-10 pt-2 rounded-xl bg-red-500/80 text-white text-lg font-bold cursor-pointer"
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
}
