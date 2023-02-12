import React from "react";
import { RouterProvider } from "react-router-dom";
import "./styles/style.css";
import { router } from "./routers/routers";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
