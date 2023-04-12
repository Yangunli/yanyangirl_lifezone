import React, { useState } from "react";
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
import { taipeiExp } from "../data/taipeiExhibition";
import { taichungExp } from "../data/taichungExhibition";
import { tainanExp } from "../data/tainanExhibition";
const CityInfoGroup = () => {
  const [currentTab, setCurrentTab] = useState("current");
  const { modalContent, modalToggle, changeContent } = useModal();
  const { city, page } = useOutletContext();
  const { width } = useWindowResize();
  const exhibitions =
    page == "exhibition"
      ? city == "taipei"
        ? taipeiExp
        : city == "taichung"
        ? taichungExp
        : city == "tainan"
        ? tainanExp
        : null
      : null;

  const venues =
    page == "venue"
      ? city == "taipei"
        ? taipeiVenues
        : city == "taichung"
        ? taichungVenues
        : tainanVenues
      : null;
  const { imgsLoaded } = usePromise(page == "venue" ? venues : exhibitions);
  const exhibitionsAfterFilter =
    page == "exhibition"
      ? currentTab == "current"
        ? currentFilter(exhibitions)
        : upComingFilter(exhibitions)
      : null;
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
              className="currentBtn exhibition__Btn"
              onClick={() => setCurrentTab("current")}
            >
              CURRENT
            </button>
            <button
              className="upComingBtn exhibition__Btn"
              onClick={() => setCurrentTab("upComing")}
            >
              UPCOMING
            </button>
          </>
        )}

        {imgsLoaded ? (
          <>
            {page == "exhibition"
              ? exhibitionsAfterFilter.map((view) => (
                  <SingleContent
                    classNames={classNames}
                    isOpenChecked={isOpenChecked}
                    exhibition={view}
                    key={view.id}
                    changeContent={changeContent}
                  />
                ))
              : venues &&
                venues.map((view) => (
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
