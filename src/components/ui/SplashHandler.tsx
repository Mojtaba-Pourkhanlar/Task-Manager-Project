/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";

export default function SplashHandler() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    const removeTimeout = setTimeout(() => {
      setShouldRender(false);
    }, 1000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div id="planico-splash" className={!isVisible ? "fade-out" : ""}>
      <div className="loader-logo">
        <img src="/icons/favicon.png" alt="Planico" width="80" height="80" />
      </div>
      <div className="loader-bar">
        <div className="loader-progress"></div>
      </div>
    </div>
  );
}
