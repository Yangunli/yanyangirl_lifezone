import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { cityList } from "../data/cityList";
import { useWindowResize } from "../hooks/useWindowResize";
import { usePromise } from "../hooks/usePromise";
import PageTransition from "../components/PageTransition";
import Loading from "../components/Loading";
const City = () => {
  const { city } = useOutletContext();
  const { width, height } = useWindowResize();
  const cityObj = cityList.filter((c) => c.name == city);
  const cityImgUrl = cityObj[0].src;
  const { imgsLoaded } = usePromise(cityObj);

  return (
    <div className="main exhibition-bg ">
      {imgsLoaded ? (
        <>
          <PageTransition />
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
                transform: `translate3d(   ${
                  width > 600
                    ? width / 4 + 40
                    : width > 280
                    ? width / 4 - 20
                    : width / 4 - 50
                }px ,  
            ${height / 2 + 40}px  ,0)  `,
              }}
            >
              VENUE
            </Link>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default City;
