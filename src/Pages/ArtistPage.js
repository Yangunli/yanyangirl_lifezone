import React from "react";
import { artists } from "../data/artists";
import { Link, useOutletContext } from "react-router-dom";
import PageHeader from "../components/PageHeader";
const ArtistPage = () => {
  return (
    <>
      <PageHeader />
      <div className="pt-200">
        {artists.map((artist) => (
          <Link to={`/artist/${artist.id}`} key={artist.id} className="card">
            <h2> {artist.artist} </h2>
            <h3>{artist.category}</h3>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ArtistPage;
