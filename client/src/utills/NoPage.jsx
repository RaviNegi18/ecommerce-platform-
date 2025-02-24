import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="flex mt-10 flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back To Home
      </Link>
    </div>
  );
};

export default NoPage;
