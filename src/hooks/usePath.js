import { useLocation } from "react-router-dom";
export const usePath = () => {
  const path = useLocation().pathname;
  const pathArr = path.split("/");
  return { path, pathArr };
};
