import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taichungVenues } from "../data/taichungVenue";
import { tainanVenues } from "../data/tainanVenues";
import PageHeader from "../components/PageHeader";
import { isOpenChecked, translateWeekday } from "../function/weekdayFilter";
import { exhibitionList } from "../data/exhibitionList";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";

const VenueInfo = () => {
  const { Id } = useParams();
  const categoryEl = useOutletContext();
  const city = categoryEl.city;
  const { modalContent, changeContent, modalToggle } = useModal();
  const venues =
    city === "taipei"
      ? taipeiVenues
      : city === "taichung"
      ? taichungVenues
      : tainanVenues;
  const venue = venues.find((venue) => venue.id == Id);
  const venueOpenArr = venue.openDay.split("");
  const isVenueOpen = isOpenChecked(venueOpenArr);
  const exhibitions = exhibitionList.filter(
    (exhibition) => exhibition.venue == venue.venue
  );
  return (
    <div className="main venue-bg">
      <PageHeader />
      <div className="pt-200 w-100 df">
        <img className="venue__img" src={venue.src} alt={venue.venue} />
        <h1>{venue.venue}</h1>
        <h3>
          {isVenueOpen
            ? isVenueOpen == "?"
              ? "不定休"
              : "今日有開"
            : "今日公休"}
        </h3>
        {isVenueOpen != "?" && (
          <p>
            營業日: {translateWeekday(venueOpenArr.at(0))}-
            {translateWeekday(venueOpenArr.at(-1))}
          </p>
        )}
      </div>
      <div className="card-container pt-100 history">
        {exhibitions.map((exhibition) =>
          exhibition.imgUrl.map((url) => (
            <img
              key={url}
              src={url}
              alt=""
              className="card"
              onClick={() => changeContent(exhibition)}
            />
          ))
        )}
      </div>
      {modalToggle && (
        <Modal
          changeContent={changeContent}
          modalContent={modalContent.current}
        />
      )}
    </div>
  );
};

export default VenueInfo;
