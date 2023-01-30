import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { cityList } from "../data/cityList";

const CityLayout = () => {
  const { cityName } = useParams();

  const city = cityList.find((cityEl) => cityEl.name == cityName);

  return (
    <>
      <Outlet context={{ cityObj: city }} />
    </>
  );
};

export default CityLayout;
