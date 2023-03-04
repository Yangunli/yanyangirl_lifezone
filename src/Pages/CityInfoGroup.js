import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taichungVenues } from "../data/taichungVenue";
import { tainanVenues } from "../data/tainanVenues";
import SingleContent from "../components/SingleContent";
import PageHeader from "../components/PageHeader";
import classNames from "../function/classNames";
import { currentFilter, upComingFilter } from "../function/exhibitionFilter";
import Modal from "../components/Modal";
import { isOpenChecked } from "../function/weekdayFilter";
import { scrollWin } from "../function/group";
import { useModal } from "../hooks/useModal";
import { usePromise } from "../hooks/usePromise";
import Loading from "../components/Loading";
import { useWindowResize } from "../hooks/useWindowResize";
import PageTransition from "../components/PageTransition";
const CityInfoGroup = () => {
  const [currentTab, setCurrentTab] = useState("current");
  const [views, setViews] = useState([]);
  const { modalContent, modalToggle, changeContent } = useModal();
  const { city, page } = useOutletContext();
  const { width } = useWindowResize();
  const getExhibiotnInfo = async () => {
    if (city == "taipei") {
      await import("../data/taipeiExhibition").then(({ taipeiExp }) => {
        setViews(taipeiExp);
      });
    }
    if (city == "taichung") {
      await import("../data/taichungExhibition").then(({ taichungExp }) => {
        setViews(taichungExp);
      });
    }
    if (city == "tainan") {
      await import("../data/tainanExhibition").then(({ tainanExp }) => {
        setViews(tainanExp);
      });
    }
  };

  const viewsAfterFilter =
    currentTab == "current" ? currentFilter(views) : upComingFilter(views);
  const venues =
    city == "taipei"
      ? taipeiVenues
      : city == "taichung"
      ? taichungVenues
      : tainanVenues;
  const { imgsLoaded } = usePromise(page == "venue" ? venues : views);
  useEffect(() => {
    getExhibiotnInfo();
  }, []);
  return (
    <div
      className={classNames(
        page == "exhibition" ? "exhibition-bg" : "venue-bg",
        "main"
      )}
    >
      <PageHeader />
      {imgsLoaded && <PageTransition />}
      <div
        className={classNames(
          imgsLoaded ? "card-container" : "",
          width < 450 ? "w-60" : "",
          "pt-200",
          "pb-45",
          "pi-20"
        )}
      >
        {page == "exhibition" && (
          <>
            <button
              style={{
                position: "fixed",
                top: "40vh",
                left: "5px",
                rotate: "90deg",
                fontSize: "1rem",
              }}
              onClick={() => setCurrentTab("current")}
            >
              CURRENT
            </button>
            <button
              style={{
                position: "fixed",
                top: "75vh",
                left: "0px",
                rotate: "90deg",
                fontSize: "1rem",
              }}
              onClick={() => setCurrentTab("upComing")}
            >
              UPCOMING
            </button>
          </>
        )}

        {imgsLoaded ? (
          <>
            {page == "exhibition"
              ? viewsAfterFilter.map((view) => (
                  <SingleContent
                    classNames={classNames}
                    isOpenChecked={isOpenChecked}
                    exhibition={view}
                    key={view.id}
                    changeContent={changeContent}
                  />
                ))
              : venues.map((view) => (
                  <Link
                    to={`${view.id}`}
                    key={view.id}
                    onClick={scrollWin}
                    className={classNames(
                      isOpenChecked(view.openDay.split(""))
                        ? ""
                        : "closedFilter",
                      "card"
                    )}
                  >
                    <img
                      className="card__img"
                      src={view?.venueImgUrl[0]}
                      alt={view.venue}
                    />
                    <h2> {view.venue} </h2>
                  </Link>
                ))}
          </>
        ) : (
          <Loading />
        )}
        {page == "exhibition" && modalToggle && (
          <Modal
            changeContent={changeContent}
            modalContent={modalContent.current}
          />
        )}
      </div>
    </div>
  );
};

export default CityInfoGroup;
