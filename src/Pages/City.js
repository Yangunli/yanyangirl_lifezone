import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { cityList } from "../data/cityList";
import { useWindowResize } from "../hooks/useWindowResize";
const City = () => {
  const { city } = useOutletContext();
  const { width, height } = useWindowResize();
  const cityObj = cityList.filter((c) => c.name == city);
  const cityImgUrl = cityObj[0].img;
  return (
    <div className="main exhibition-bg ">
      <PageHeader />
      <div
        className="banner"
        role="banner"
        style={{
          backgroundImage: `url('${cityImgUrl}')`,
        }}
      >
        <Link to="exhibition" className="test">
          {width >= 800 ? "EXHIBITION" : "EXHIBIT"}
        </Link>
        <Link
          to="venue"
          className="test"
          style={{
            marginTop:
              width < 800 && height > 610
                ? `${height - 247}px `
                : height > 610
                ? height > 1100 || (width > 1300 && height < 1100)
                  ? `${height - 350}px`
                  : `${height - 300}px`
                : `${height - 300}px`,
            marginLeft: `${width / 2 - 130}px`,
          }}
        >
          VENUE
        </Link>
      </div>
    </div>
  );
};

export default City;
