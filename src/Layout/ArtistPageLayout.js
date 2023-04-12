import React from "react";
import { Outlet } from "react-router-dom";
import { artists } from "../data/artists";
const ArtistPageLayout = () => {
  let kwList = new Set();
  const categoryFilter = artists.filter((artist) =>
    artist.category.filter((artCategory) =>
      !kwList.has(artCategory) ? kwList.add(artCategory) : false
    )
  );
  kwList = Array.from(kwList);
  return (
    <div className="main exhibition-bg ">
      <Outlet context={{ artists: artists, kwList: kwList }} />
    </div>
  );
};

export default ArtistPageLayout;
