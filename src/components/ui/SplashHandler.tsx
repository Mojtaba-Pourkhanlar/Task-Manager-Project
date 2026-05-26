/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

export default function SplashHandler() {
  const [, setShow] = useState(false);

  useEffect(() => {
    const splash = document.getElementById("planico-splash");
    if (splash && splash.style.display === "flex") {
      const timer = setTimeout(() => {
        splash.classList.add("fade-out");
        setTimeout(() => {
          splash.style.display = "none";
          setShow(false);
        }, 500);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div id="planico-splash">
      <img src="/icons/favicon.png" className="loader-logo" alt="Planico" />
      <div className="loader-bar">
        <div className="loader-progress"></div>
      </div>
    </div>
  );
}
