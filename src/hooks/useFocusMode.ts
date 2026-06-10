"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "focus_mode_session";

interface FocusSession {
  taskId: string;
  taskTitle: string;
  endsAt: number; // timestamp
  totalSeconds: number;
}

interface FocusNotificationTexts {
  title: string;
  body: (taskTitle: string) => string;
}

function loadSession(): FocusSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const stored: FocusSession = JSON.parse(raw);
  if (stored.endsAt > Date.now()) return stored;
  localStorage.removeItem(STORAGE_KEY);
  return null;
}

export function useFocusMode(texts: FocusNotificationTexts) {
  const [session, setSession] = useState<FocusSession | null>(loadSession);
  const [remaining, setRemaining] = useState(() => {
    const s = loadSession();
    return s ? Math.ceil((s.endsAt - Date.now()) / 1000) : 0;
  });
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!session) return;

    timerRef.current = setInterval(() => {
      const left = Math.ceil((session.endsAt - Date.now()) / 1000);
      if (left <= 0) {
        clearInterval(timerRef.current!);
        setRemaining(0);
        setIsFinished(true);
        localStorage.removeItem(STORAGE_KEY);
        triggerFocusEffects(session.taskTitle, texts);
      } else {
        setRemaining(left);
      }
    }, 500);

    return () => clearInterval(timerRef.current!);
  }, [session]);

  const start = (taskId: string, taskTitle: string, totalSeconds: number) => {
    const newSession: FocusSession = {
      taskId,
      taskTitle,
      endsAt: Date.now() + totalSeconds * 1000,
      totalSeconds,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    setSession(newSession);
    setRemaining(totalSeconds);
    setIsFinished(false);
  };

  const reset = () => {
    clearInterval(timerRef.current!);
    setSession(null);
    setRemaining(0);
    setIsFinished(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { session, remaining, isFinished, start, reset };
}
function triggerFocusEffects(taskTitle: string, texts: FocusNotificationTexts) {
  playSound();
  flashScreen();
  blinkTabTitle("✅ Focus Finished!");

  triggerNotification(taskTitle, texts);
}
function triggerNotification(taskTitle: string, texts: FocusNotificationTexts) {
  if (!("Notification" in window)) return;

  const send = () =>
    new Notification(texts.title, {
      body: texts.body(taskTitle),
      icon: "/favicon.ico",
    });

  if (Notification.permission === "granted") {
    send();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(p => {
      if (p === "granted") send();
    });
  }
}

function playSound() {
  try {
    const ctx = new AudioContext();
    const times = [0, 0.35, 0.7];

    times.forEach(t => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = 880;
      osc2.frequency.value = 1320;

      osc1.type = "sine";
      osc2.type = "sine";

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      gain.gain.setValueAtTime(0.9, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.35);

      osc1.start(ctx.currentTime + t);
      osc2.start(ctx.currentTime + t);

      osc1.stop(ctx.currentTime + t + 0.35);
      osc2.stop(ctx.currentTime + t + 0.35);
    });
  } catch {}
}

function blinkTabTitle(message: string) {
  const original = document.title;
  let visible = false;

  const interval = setInterval(() => {
    document.title = visible ? original : message;
    visible = !visible;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    document.title = original;
  }, 8000);
}

function flashScreen() {
  const el = document.createElement("div");

  el.style.position = "fixed";
  el.style.inset = "0";
  el.style.background = "white";
  el.style.opacity = "0";
  el.style.pointerEvents = "none";
  el.style.zIndex = "9999";
  el.style.transition = "opacity 200ms";

  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "0.15";
  });

  setTimeout(() => {
    el.style.opacity = "0";
  }, 120);

  setTimeout(() => {
    el.remove();
  }, 400);
}
