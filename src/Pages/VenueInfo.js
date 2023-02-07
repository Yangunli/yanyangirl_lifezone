import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taichungVenues } from "../data/taichungVenue";
import { tainanVenues } from "../data/tainanVenues";
import PageHeader from "../components/PageHeader";
import { isOpenChecked, translateWeekday } from "../function/weekdayFilter";

const VenueInfo = () => {
  const { Id } = useParams();

  const categoryEl = useOutletContext();
  const city = categoryEl.city;

  const venues =
    city === "taipei"
      ? taipeiVenues
      : city === "taichung"
      ? taichungVenues
      : tainanVenues;
  const venue = venues.find((venue) => venue.id == Id);
  const venueOpenArr = venue.openDay.split("");
  const isVenueOpen = isOpenChecked(venueOpenArr);
  console.log(venueOpenArr[0]);
  return (
    <div className="main venue-bg">
      <PageHeader />
      <div className="pt-200">
        <img className="venue__img" src={venue.src} alt={venue.venue} />
        <h1>{venue.venue}</h1>
        <h3>{isVenueOpen ? "今日有開" : "今日公休"}</h3>
        <p>
          營業日: {translateWeekday(venueOpenArr.at(0))}-
          {translateWeekday(venueOpenArr.at(-1))}
        </p>
      </div>
    </div>
  );
};

export default VenueInfo;
