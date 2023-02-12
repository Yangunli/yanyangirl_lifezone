import React, { useState, useRef, useEffect } from "react";
import { useOutletContext, Link, useLocation } from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taichungVenues } from "../data/taichungVenue";
import { tainanVenues } from "../data/tainanVenues";
import SingleContent from "../components/SingleContent";
import PageHeader from "../components/PageHeader";
import classNames from "../function/classNames";
import { currentFilter, upComingFilter } from "../function/exhibitionFilter";
import Modal from "../components/Modal";
import { isOpenChecked } from "../function/weekdayFilter";
const CityInfoGroup = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [currentTab, setCurrentTab] = useState("current");
  const [views, setViews] = useState([]);
  const modalContent = useRef([]);
  const changeContent = (info) => {
    modalContent.current = [info];
    setModalToggle(!modalToggle);
  };
  const categoryEl = useOutletContext();
  const city = categoryEl.city;

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

  useEffect(() => {
    getExhibiotnInfo();
  }, [views]);

  return (
    <div
      className={classNames(
        categoryEl.page == "exhibition" ? "exhibition-bg" : "venue-bg",
        "main"
      )}
    >
      <PageHeader />
      <div className="card-container pt-200 ">
        {categoryEl.page == "exhibition" && (
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

        {categoryEl.page == "exhibition"
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
                className={classNames(
                  isOpenChecked(view.openDay.split("")) ? "" : "closedFilter",
                  "card"
                )}
              >
                <img className="card__img" src={view.src} alt={view.name} />
                <h2> {view.venue} </h2>
              </Link>
            ))}
        {categoryEl.page == "exhibition" && modalToggle && (
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
