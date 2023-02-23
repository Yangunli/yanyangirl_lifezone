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
const CityInfoGroup = () => {
  const [currentTab, setCurrentTab] = useState("current");
  const [views, setViews] = useState([]);
  const { modalContent, modalToggle, changeContent } = useModal();
  const { city, page } = useOutletContext();
  const [imgsLoaded, setImgsLoaded] = useState(false);

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

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.venueImgUrl[0] ? image.venueImgUrl[0] : image.src;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.venueImgUrl[0] ? image.venueImgUrl[0] : image.src);
          }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };
    if (page == "exhibition") {
      Promise.all(views.map((image) => loadImage(image)))
        .then(() => setImgsLoaded(true))
        .catch((err) => console.log("Failed to load images", err));
    } else {
      Promise.all(venues.map((image) => loadImage(image)))
        .then(() => setImgsLoaded(true))
        .catch((err) => console.log("Failed to load images", err));
    }
  }, []);

  return (
    <div
      className={classNames(
        page == "exhibition" ? "exhibition-bg" : "venue-bg",
        "main"
      )}
    >
      <PageHeader />
      <div className="card-container pt-200 ">
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

        {page == "exhibition" ? (
          imgsLoaded ? (
            viewsAfterFilter.map((view) => (
              <SingleContent
                classNames={classNames}
                isOpenChecked={isOpenChecked}
                exhibition={view}
                key={view.id}
                changeContent={changeContent}
              />
            ))
          ) : (
            <h1>Loading images...</h1>
          )
        ) : imgsLoaded ? (
          venues.map((view) => (
            <Link
              to={`${view.id}`}
              key={view.id}
              onClick={scrollWin}
              className={classNames(
                isOpenChecked(view.openDay.split("")) ? "" : "closedFilter",
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
          ))
        ) : (
          <h1>Loading images...</h1>
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
