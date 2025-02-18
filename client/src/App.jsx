import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MyState from "./context/data/myState";
import Navbar from "./Layout/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./utills";

import Loader from "./utills/Loader";

function App() {
  return (
    <MyState>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          {AppRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
      <ToastContainer />
    </MyState>
  );
}

export default App;
