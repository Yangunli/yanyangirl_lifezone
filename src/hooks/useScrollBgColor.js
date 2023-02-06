import { useEffect, useState } from "react";

export const useScrollBgColor = () => {
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    const changeBgColor = () => {
      if (window.scrollY < 1200) {
        setBgColor("28%,76%");
      } else if (window.scrollY >= 1200 && window.scrollY < 2400) {
        setBgColor("17%,57%");
      } else if (window.scrollY >= 2400 && window.scrollY < 3600) {
        setBgColor("28%,76%");
      } else if (window.scrollY >= 3600 && window.scrollY < 4800) {
        setBgColor("17%,57%");
      } else {
        setBgColor("28%,76%");
      }
    };
    window.addEventListener("scroll", changeBgColor);
    return () => window.removeEventListener("scroll", changeBgColor);
  }, []);
  return bgColor;
};
