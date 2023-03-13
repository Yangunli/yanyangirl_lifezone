import React, { lazy } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
const CityLayout = lazy(() => import("../Layout/CityLayout"));
// import CityLayout from "../Layout/CityLayout";
const ArtistPageLayout = lazy(() => import("../Layout/ArtistPageLayout"));
// import ArtistPageLayout from "../Layout/ArtistPageLayout";
const Home = lazy(() => import("../Pages/Home"));
// import Home from "../Pages/Home";
const ArtistPage = lazy(() => import("../Pages/ArtistPage"));
// import ArtistPage from "../Pages/ArtistPage";
const ArtistInfo = lazy(() => import("../Pages/ArtistInfo"));
// import ArtistInfo from "../Pages/ArtistInfo";
const CityInfoGroup = lazy(() => import("../Pages/CityInfoGroup"));
// import CityInfoGroup from "../Pages/CityInfoGroup";
const VenueInfo = lazy(() => import("../Pages/VenueInfo"));
// import VenueInfo from "../Pages/VenueInfo";

import Login from "../Pages/Login";
import Info from "../Pages/Info";
import UserLayout from "../Layout/UserLayout";
const City = lazy(() => import("../Pages/City"));
// import City from "../Pages/City";
const InfoLayout = lazy(() => import("../Layout/InfoLayout"));
// import InfoLayout from "../Layout/InfoLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Home />} index />
      <Route path="/admin" element={<UserLayout />}>
        <Route index element={<Login />} />
        <Route path="info" element={<Info />} />
      </Route>
      <Route path="/artist" element={<ArtistPageLayout />}>
        <Route index element={<ArtistPage />} />
        <Route path=":Id" element={<ArtistInfo />} />
      </Route>
      <Route path=":cityName" element={<CityLayout />}>
        <Route index element={<City />} />
        <Route path=":option" element={<InfoLayout />}>
          <Route index element={<CityInfoGroup />} />
          <Route path=":Id" element={<VenueInfo />} />
        </Route>
      </Route>
      <Route path="*" element={<Home />} replace />
    </Route>
  )
);
