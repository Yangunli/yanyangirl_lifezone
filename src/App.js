import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./styles/style.css";
import CityLayout from "./Layout/CityLayout";
import ArtistPageLayout from "./Layout/ArtistPageLayout";
import Home from "./Pages/Home";
import OptionLayout from "./Layout/OptionLayout";
import VenueLayout from "./Layout/VenueLayout";
import ArtistPage from "./Pages/ArtistPage";
import ArtistInfo from "./Pages/ArtistInfo";
import CityInfoGroup from "./Pages/CityInfoGroup";
import VenueInfo from "./Pages/VenueInfo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Home />} index />
      <Route path="/artist" element={<ArtistPageLayout />}>
        <Route index element={<ArtistPage />} />
        <Route path=":Id" element={<ArtistInfo />} />
      </Route>
      <Route path=":cityName" element={<CityLayout />}>
        <Route index element={<OptionLayout />} />
        <Route path=":option" element={<VenueLayout />}>
          <Route index element={<CityInfoGroup />} />
          <Route path=":Id" element={<VenueInfo />} />
        </Route>
      </Route>
      <Route path="*" element={<Home />} replace />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
