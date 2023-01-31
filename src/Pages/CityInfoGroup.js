import React, { useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taipeiExp } from "../data/taipeiExhibition";
import { taichungVenues } from "../data/taichungVenue";
import { taichungExp } from "../data/taichungExhibition";
import { tainanVenues } from "../data/tainanVenues";
import { tainanExp } from "../data/tainanExhibition";
import SingleContent from "../components/SingleContent";
import ModalContent from "../components/ModalContent";
import PageHeader from "../components/PageHeader";
import classNames from "../function/classNames";
const CityInfoGroup = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const changeContent = (info) => {
    setModalContent([info]);
    setModalToggle(!modalToggle);
  };
  const categoryEl = useOutletContext();
  const city = categoryEl.city;
  const views =
    city === "taipei"
      ? taipeiExp.filter(
          (exhibit) => new Date(exhibit.time.split("-")[1]) > new Date()
        )
      : city === "taichung"
      ? taichungExp.filter(
          (exhibit) => new Date(exhibit.time.split("-")[1]) > new Date()
        )
      : tainanExp.filter(
          (exhibit) => new Date(exhibit.time.split("-")[1]) > new Date()
        );
  const venues =
    city === "taipei"
      ? taipeiVenues
      : city === "taichung"
      ? taichungVenues
      : tainanVenues;

  return (
    <div
      className={classNames(
        categoryEl.page === "exhibition" ? "exhibition-bg" : "venue-bg",
        "main"
      )}
    >
      <PageHeader />
      <div className="card-container pt-200">
        {categoryEl.page === "exhibition"
          ? views.map((view) => (
              <SingleContent
                exhibition={view}
                key={view.id}
                changeContent={changeContent}
              />
            ))
          : venues.map((view) => (
              <Link
                to={`/${city}/venue/${view.id}`}
                key={view.id}
                className="card"
              >
                <img className="card__img" src={view.src} alt={view.name} />
                <h2> {view.venue} </h2>
              </Link>
            ))}
        {categoryEl.page === "exhibition" && modalToggle && (
          <div className="modal-container" onClick={changeContent}>
            {modalContent.map((modal) => (
              <ModalContent info={modal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityInfoGroup;
