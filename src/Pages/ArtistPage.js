import React from "react";
import { artists } from "../data/artists";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
const ArtistPage = () => {
  return (
    <>
      <PageHeader />
      <div className="pt-200">
        {artists.map((artist) => (
          <Link to={`${artist.id}`} key={artist.id} className="card">
            <h2> {artist.brand || artist.artist} </h2>
            <h3>{artist.category}</h3>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ArtistPage;
