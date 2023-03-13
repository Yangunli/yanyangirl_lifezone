import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./styles/style.css";
import { router } from "./routers/routers";
import Loading from "./components/Loading";
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
