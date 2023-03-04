import React from "react";
import { artists } from "../data/artists";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { kwList } from "../data/artistCategory";
import classNames from "../function/classNames";
import PageTransition from "../components/PageTransition";
const ArtistPage = () => {
  return (
    <>
      <PageHeader />
      <PageTransition />
      <div className=" artist-container">
        {artists.map((artist) => (
          <Link to={`${artist.id}`} key={artist.id} className="artist w-100">
            {artist.imgUrl ? <img src={artist.imgUrl} alt="" /> : null}
            <h2> {artist.brand || artist.artist} </h2>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ArtistPage;
