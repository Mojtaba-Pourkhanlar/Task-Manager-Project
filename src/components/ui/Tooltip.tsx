"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Position,
  tooltipPositionStyles,
  tooltipBaseStyles,
} from "./components.styles";

interface TooltipProps {
  text?: string;
  children: ReactNode;
  position?: Position;
}

const MOBILE_TRUNCATE = 18;
const DESKTOP_TRUNCATE = 35;

const Tooltip = ({ text, children, position = "bottom" }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 780);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const truncateAfter = isLargeScreen ? DESKTOP_TRUNCATE : MOBILE_TRUNCATE;

  const isTextChild = typeof children === "string";

  const fullText = useMemo(() => {
    if (text?.trim()) return text;

    if (isTextChild) {
      return children;
    }

    return "";
  }, [text, children, isTextChild]);

  const shouldTruncate = isTextChild && fullText.length > truncateAfter;

  const displayedChild = useMemo(() => {
    if (!isTextChild) return children;

    if (!shouldTruncate) return children;

    return `${fullText.slice(0, truncateAfter)}...`;
  }, [children, fullText, isTextChild, shouldTruncate, truncateAfter]);

  const shouldShowTooltip =
    isLargeScreen && shouldTruncate && fullText.length > 0;

  return (
    <div className="relative inline-block max-w-full cursor-pointer">
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex max-w-full"
      >
        {isTextChild ? (
          <span className="truncate">{displayedChild}</span>
        ) : (
          children
        )}
      </span>

      {shouldShowTooltip && isVisible && (
        <div
          className={`
            ${tooltipBaseStyles}
            ${tooltipPositionStyles[position]}
          `}
        >
          {fullText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
