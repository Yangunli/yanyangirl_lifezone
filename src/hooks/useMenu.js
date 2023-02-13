import { useState } from "react";

export const useMenu = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const changeMenu = () => {
    setMenuToggle(!menuToggle);
  };
  return { menuToggle, changeMenu };
};
