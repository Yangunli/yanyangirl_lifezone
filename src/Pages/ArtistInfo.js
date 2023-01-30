import React from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { artists } from "../data/artists";
import PageHeader from "../components/PageHeader";
const ArtistInfo = () => {
  const { Id } = useParams();
  const artist = artists.find((artist) => artist.id == Id);
  return (
    <>
      <PageHeader />
      <div className="pt-200">
        <h1>{artist.artist}</h1>
        <NavLink to="/taipei/venue/110">舊香居</NavLink>
      </div>
    </>
  );
};

export default ArtistInfo;
