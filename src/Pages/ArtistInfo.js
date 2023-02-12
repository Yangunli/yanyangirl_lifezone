import React from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { artists } from "../data/artists";
import PageHeader from "../components/PageHeader";
import { exhibitionList } from "../data/exhibitionList";
const ArtistInfo = () => {
  const { Id } = useParams();
  const artist = artists.find((artist) => artist.id == Id);
  const exhibitions = exhibitionList.filter(
    (exhibition) => exhibition.artist == artist.artist
  );

  return (
    <>
      <PageHeader />
      <div className="pt-200">
        <h1>{artist.artist}</h1>
        {exhibitions.map((exhibition) => (
          <Link> {exhibition.venue} </Link>
        ))}
      </div>
    </>
  );
};

export default ArtistInfo;
