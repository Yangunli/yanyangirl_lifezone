import React, { lazy } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
const CityLayout = lazy(() => import("../Layout/CityLayout"));
const ArtistPageLayout = lazy(() => import("../Layout/ArtistPageLayout"));
const Home = lazy(() => import("../Pages/Home"));
const ArtistGroup = lazy(() => import("../Pages/ArtistGroup"));
const ArtistInfo = lazy(() => import("../Pages/ArtistInfo"));
const CityInfoGroup = lazy(() => import("../Pages/CityInfoGroup"));
const VenueInfo = lazy(() => import("../Pages/VenueInfo"));
import Login from "../Pages/Login";
import Info from "../Pages/Info";
import UserLayout from "../Layout/UserLayout";
const City = lazy(() => import("../Pages/City"));
const InfoLayout = lazy(() => import("../Layout/InfoLayout"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Home />} index />
      <Route path="/admin" element={<UserLayout />}>
        <Route index element={<Login />} />
        <Route path="info" element={<Info />} />
      </Route>
      <Route path="/artist" element={<ArtistPageLayout />}>
        <Route index element={<ArtistGroup />} />
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
