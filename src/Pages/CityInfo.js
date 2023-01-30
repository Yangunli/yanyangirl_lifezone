import React, { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taichungVenues } from "../data/taichungVenue";
import { tainanVenues } from "../data/tainanVenues";
import { ArrowSvg } from "../components/SvgComponents";
const CityInfo = () => {
  const navigate = useNavigate();
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
    <div className="main venue-bg">
      <img className="venue__img" src={venue.src} alt={venue.venue} />
      <h1>{venue.venue}</h1>
      <button onClick={() => navigate(-1)} alt="goback" className="goback">
        <ArrowSvg />
      </button>
    </div>
  );
};

export default CityInfo;
