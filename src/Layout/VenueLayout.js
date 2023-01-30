import React from "react";
import { Outlet, useParams, useOutletContext } from "react-router-dom";

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
  const pathName = useOutletContext();
  const venueORexhibition = optionList.find((pageEl) => pageEl.name == option);
  return (
    <>
      <Outlet
        context={{ page: venueORexhibition.name, city: pathName.cityObj.name }}
      />
    </>
  );
};

export default VenueLayout;
