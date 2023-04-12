import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { navList } from "../data/navList";

const CityLayout = () => {
  const { cityName } = useParams();
  const cityList = navList.filter((li) => li.src);
  const city = cityList.find((cityEl) => cityEl.name == cityName);

  return (
    <>
      <Outlet context={{ city: cityName, cityList: cityList }} />
    </>
  );
};

export default CityLayout;
