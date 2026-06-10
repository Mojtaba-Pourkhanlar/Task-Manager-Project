"use client";

import { CheckCircle2, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  remaining: number;
  totalSeconds: number;
  taskTitle: string;
  isFinished: boolean;
  onReset: () => void;
}

export default function FocusTimerOverlay({
  remaining,
  totalSeconds,
  taskTitle,
  isFinished,
  onReset,
}: Props) {
  const t = useTranslations("focus.FocusTimer");

  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference * (1 - progress);

  const timeForAria = fmt(remaining).replace(/:/g, " ");

  return (
    <div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl transition-all duration-700"
      role="dialog"
      aria-modal="true"
      aria-labelledby="focus-status"
    >
      {!isFinished && (
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-indigo-500/20 rounded-full blur-[80px] animate-ping [animation-duration:4s]" />
        </div>
      )}

      <div
        className="relative flex items-center justify-center scale-110 md:scale-125"
        role="timer"
        aria-label={t("timerLabel", { time: timeForAria })}
      >
        <svg
          width="200"
          height="200"
          className="-rotate-90 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="currentColor"
            className="text-white/5"
            strokeWidth="6"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke={isFinished ? "#22c55e" : "url(#timerGrad)"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isFinished ? (
            <div className="animate-bounce" aria-hidden="true">
              <CheckCircle2 size={60} className="text-green-400" />
            </div>
          ) : (
            <div className="text-center select-none">
              <span className="text-4xl font-black text-white font-mono tracking-tighter">
                {fmt(remaining)}
              </span>
              <div
                className="h-1 w-8 bg-violet-500 mx-auto mt-1 rounded-full animate-width"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 text-center px-6 z-10">
        <h3
          id="focus-status"
          aria-live="polite"
          className={`text-xl font-bold transition-all ${isFinished ? "text-green-400 scale-110" : "text-white/90"}`}
        >
          {isFinished ? t("statusFinished") : t("statusActive")}
        </h3>
        <p className="mt-2 text-white/50 text-sm font-medium max-w-sm italic">
          {t("taskLabel", { title: taskTitle })}
        </p>
      </div>

      <button
        onClick={onReset}
        aria-label={isFinished ? t("closeFinished") : t("cancelFocus")}
        className="cursor-pointer mt-12 group flex items-center gap-3 px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        <X
          size={18}
          className="group-hover:rotate-90 transition-transform"
          aria-hidden="true"
        />
        <span className="font-semibold text-sm">
          {isFinished ? t("closeFinished") : t("cancelFocus")}
        </span>
      </button>
    </div>
  );
}

function fmt(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const parts = [];
  if (h > 0) parts.push(String(h).padStart(2, "0"));
  parts.push(String(m).padStart(2, "0"));
  parts.push(String(sec).padStart(2, "0"));
  return parts.join(":");
}
