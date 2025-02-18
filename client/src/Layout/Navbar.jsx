import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { BsFillCloudMoonFill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

import { FiSun } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import myContext from "@/context/data/myContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { mode, toggleMode } = context;
  const [menuOpen, setMenuOpen] = useState(false);

  const isDarkTheme = mode === "dark";
  const user = true;

  const logout = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 py-2 px-10 shadow-md flex items-center justify-between ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Title */}
        <Link
          to="/"
          className={`text-2xl font-bold text-primary ${
            isDarkTheme ? "text-white" : "text-slate-600"
          }`}
        >
          Shopsy
        </Link>

        {/* Navigation Links (Hidden on Mobile) */}
        <ul className="md:flex items-center justify-center font-semibold gap-10 cursor-pointer hidden">
          <Link
            to="/"
            className={isDarkTheme ? "text-white" : "text-slate-600"}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={isDarkTheme ? "text-white" : "text-slate-600"}
          >
            Products
          </Link>
          <Link
            to="/contacts"
            className={isDarkTheme ? "text-white" : "text-slate-600"}
          >
            Contact us
          </Link>
        </ul>

        {/* Right Section - Buttons & Menu */}
        <div className="flex items-center space-x-4">
          {/* Sign In / Sign Up Buttons */}
          <div className="pr-10 sm:flex items-center justify-center hidden gap-4">
            <button
              className={`px-2.5 py-1.5 rounded-md font-medium transition-all duration-300 ${
                isDarkTheme
                  ? "bg-blue-700 text-white hover:bg-blue-400"
                  : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
            >
              <Link to="/sign-in">Sign In</Link>
            </button>

            <button
              className={`px-2 py-1 rounded-md font-medium transition-all duration-300 border ${
                isDarkTheme
                  ? "border-blue-400 text-blue-400 hover:bg-blue-700 hover:text-white"
                  : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <Link to="/sign-up">Sign Up</Link>
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <button
              className={`text-lg font-bold text-primary ${
                isDarkTheme ? "text-white" : "text-slate-600"
              }`}
            >
              <FaShoppingCart size={"30px"} />
            </button>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleMode}
              className={`text-lg font-bold text-primary ${
                isDarkTheme ? "text-white" : "text-slate-600"
              }`}
            >
              {isDarkTheme ? (
                <BsFillCloudMoonFill size={"30px"} />
              ) : (
                <FiSun size={"30px"} />
              )}
            </button>
            {/* Menu Button (Placed at the End) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="text-xl right-0 md:hidden ml-auto"
            >
              <MdOutlineMenu
                size={"30px"}
                className={isDarkTheme ? "text-white" : "text-gray-700"}
              />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="fixex inset-0 bg-black bg-opacity-40 z-50 ">
            <div
              className={`fixed right-0 top-0 h-full w-64  p-4 shadow-lg transition-transform ${
                isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
            >
              <button onClick={() => setMenuOpen(false)} className="text-xl">
                <RxCross2 />
              </button>

              <div className="flex flex-col cursor-pointer mt-6 space-y-4">
                <Button className="cursor-pointer" variant="ghost" asChild>
                  <Link to="/">Home</Link>
                </Button>

                {user && (
                  <Button variant="ghost" asChild>
                    <Link to="/allproducts">Products</Link>
                  </Button>
                )}

                <Button variant="ghost" asChild>
                  <Link to="/contact">Contact us</Link>
                </Button>

                {user?.user?.email === "Ravunegi" && (
                  <Button variant="ghost" asChild>
                    <Link to="/dashboard">Admin</Link>
                  </Button>
                )}

                {user ? (
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="ghost" asChild>
                    <Link to="/signup">Signup</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
