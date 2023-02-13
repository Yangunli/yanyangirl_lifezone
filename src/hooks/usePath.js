import { useLocation } from "react-router-dom";
export const usePath = () => {
  const path = useLocation().pathname;
  const pathArr = path.split("/");
  const isArtistInfo = pathArr.includes("artist");
  const isVenueInfo = pathArr.includes("venue");
  return { path, pathArr, isArtistInfo, isVenueInfo };
};
