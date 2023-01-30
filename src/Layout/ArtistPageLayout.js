import React from "react";
import { Outlet } from "react-router-dom";

const ArtistPageLayout = () => {
  return (
    <div className="main exhibition-bg ">
      <Outlet />
    </div>
  );
};

export default ArtistPageLayout;
