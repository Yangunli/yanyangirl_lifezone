import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import CityLayout from "../Layout/CityLayout";
import ArtistPageLayout from "../Layout/ArtistPageLayout";
import Home from "../Pages/Home";
import ArtistPage from "../Pages/ArtistPage";
import ArtistInfo from "../Pages/ArtistInfo";
import CityInfoGroup from "../Pages/CityInfoGroup";
import VenueInfo from "../Pages/VenueInfo";
import Login from "../Pages/Login";
import Info from "../Pages/Info";
import UserLayout from "../Layout/UserLayout";
import City from "../Pages/City";
import InfoLayout from "../Layout/InfoLayout";

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
