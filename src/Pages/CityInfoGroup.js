import React, { useState, useRef } from "react";
import { useOutletContext, Link, useLocation } from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taipeiExp } from "../data/taipeiExhibition";
import { taichungVenues } from "../data/taichungVenue";
import { taichungExp } from "../data/taichungExhibition";
import { tainanVenues } from "../data/tainanVenues";
import { tainanExp } from "../data/tainanExhibition";
import SingleContent from "../components/SingleContent";
import PageHeader from "../components/PageHeader";
import classNames from "../function/classNames";
import { currentFilter, upComingFilter } from "../function/exhibitionFilter";
import Modal from "../components/Modal";

const CityInfoGroup = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [currentTab, setCurrentTab] = useState("current");
  const modalContent = useRef([]);
  const changeContent = (info) => {
    modalContent.current = [info];
    setModalToggle(!modalToggle);
  };
  const categoryEl = useOutletContext();
  const city = categoryEl.city;

  const views =
    city == "taipei" ? taipeiExp : city == "taichung" ? taichungExp : tainanExp;
  let viewsAfterFilter =
    currentTab == "current" ? currentFilter(views) : upComingFilter(views);
  const venues =
    city == "taipei"
      ? taipeiVenues
      : city == "taichung"
      ? taichungVenues
      : tainanVenues;

  return (
    <div
      className={classNames(
        categoryEl.page == "exhibition" ? "exhibition-bg" : "venue-bg",
        "main"
      )}
    >
      <PageHeader />
      <div className="card-container pt-200">
        {categoryEl.page == "exhibition" && (
          <>
            <button
              style={{ position: "fixed", top: "200px", left: "50px" }}
              onClick={() => setCurrentTab("current")}
            >
              current
            </button>
            <button
              style={{ position: "fixed", top: "200px" }}
              onClick={() => setCurrentTab("upComing")}
            >
              upcoming
            </button>
          </>
        )}

        {categoryEl.page == "exhibition"
          ? viewsAfterFilter.map((view) => (
              <SingleContent
                exhibition={view}
                key={view.id}
                changeContent={changeContent}
              />
            ))
          : venues.map((view) => (
              <Link to={`${view.id}`} key={view.id} className="card">
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
