import React from "react";
import {
  Outlet,
  useParams,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import Footer from "../components/Footer";

const optionList = [
  {
    name: "venue",
  },
  {
    name: "exhibition",
  },
];

const InfoLayout = () => {
  const { option } = useParams();
  const cityObj = useOutletContext();
  const path = useLocation();
  const venueORexhibition = optionList.find((pageEl) => pageEl.name == option);
  return (
    <>
      <Outlet context={{ page: venueORexhibition.name, city: cityObj?.city }} />
      <Footer />
    </>
  );
};

export default InfoLayout;
