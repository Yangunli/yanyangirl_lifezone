import { useEffect, useState } from "react";

export const useScrollBgColor = () => {
  const [bgColor, setBgColor] = useState(47);
  useEffect(() => {
    const changeBgColor = () => {
      if (window.scrollY < 1200) {
        setBgColor(39);
      } else if (window.scrollY >= 1200 && window.scrollY < 2400) {
        setBgColor(100);
      } else if (window.scrollY >= 2400 && window.scrollY < 3600) {
        setBgColor(280);
      } else if (window.scrollY >= 3600 && window.scrollY < 4800) {
        setBgColor(200);
      } else {
        setBgColor(39);
      }
    };
    window.addEventListener("scroll", changeBgColor);
    changeBgColor();
  }, []);
  return bgColor;
};
