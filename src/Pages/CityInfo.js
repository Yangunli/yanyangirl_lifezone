import React, { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taichungVenues } from "../data/taichungVenue";
import { tainanVenues } from "../data/tainanVenues";
import PageHeader from "../components/PageHeader";
const CityInfo = () => {
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
  return (
    <div className="main venue-bg w-100 h-100">
      <PageHeader />
      <div className="pt-200">
        <img className="venue__img" src={venue.src} alt={venue.venue} />
        <h1>{venue.venue}</h1>
      </div>
    </div>
  );
};

export default CityInfo;
