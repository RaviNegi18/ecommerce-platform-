import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MyState from "./context/data/myState";
import Navbar from "./Layout/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./utills/index";
import Loader from "./utills/Loader";

function App() {
  return (
    <MyState>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <AppRoutes />
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </MyState>
  );
}

export default App;
