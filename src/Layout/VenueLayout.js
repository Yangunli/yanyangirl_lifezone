import React from "react";
import {
  Outlet,
  useParams,
  useOutletContext,
  useLocation,
} from "react-router-dom";

const optionList = [
  {
    name: "venue",
  },
  {
    name: "exhibition",
  },
];

const VenueLayout = () => {
  const { option } = useParams();
  const cityObj = useOutletContext();
  const path = useLocation();
  const city = path.pathname.split("/")[1];
  const venueORexhibition = optionList.find((pageEl) => pageEl.name == option);
  return (
    <>
      <Outlet context={{ page: venueORexhibition.name, city: cityObj?.city }} />
    </>
  );
};

export default VenueLayout;
