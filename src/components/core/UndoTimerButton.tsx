"use client";

import { Undo2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  duration?: number;
  onUndo: () => void;
}

export default function UndoTimerButton({ duration = 4000, onUndo }: Props) {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    let raf: number;
    let startTime: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const elapsed = time - startTime;

      const nextProgress = Math.max(1 - elapsed / duration, 0);

      setProgress(nextProgress);

      if (nextProgress > 0) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [duration]);

  const radius = 14;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = circumference * (1 - progress);

  return (
    <button
      onClick={onUndo}
      className="
      relative flex items-center justify-center
      w-9 h-9
      text-amber-500 
      hover:text-amber-500
      transition-colors
      "
    >
      <svg width="36" height="36" className="absolute -rotate-90">
        {/* background ring */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="opacity-20"
        />

        {/* animated ring */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>

      <Undo2 size={16} strokeWidth={2.5} />
    </button>
  );
}
