import React, { useContext } from "react";
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, logoutAsAdmin } from "@/redux/api/authSlice";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsFillCloudMoonFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import myContext from "@/context/data/myContext";
import ConorImg from "../assets/conor.jpg";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.auth.admin);
  const itemCount = useSelector((state) => state.cart.itemCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode, toggleMode } = useContext(myContext);
  const isDarkTheme = mode === "dark";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  const handleLogoutAsAdmin = () => {
    dispatch(logoutAsAdmin());
    navigate("/sign-in");
  };

  const handleClose = () => setOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 py-3 px-6 shadow-md flex items-center justify-between ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-all duration-300`}
    >
      <Link to="/" className="text-2xl font-bold text-blue-500">
        Shopsy
      </Link>

      <ul className="hidden md:flex items-center space-x-8 text-lg font-medium">
        {["Home", "Products", "Contacts"].map((item, index) => (
          <NavLink
            key={index}
            to={item == "Home" ? "/" : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `hover:text-blue-500 ${isActive ? "text-blue-600 font-bold" : ""}`
            }
          >
            {item}
          </NavLink>
        ))}
        {admin && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:text-blue-500 ${isActive ? "text-blue-600 font-bold" : ""}`
            }
          >
            Dashboard
          </NavLink>
        )}
      </ul>

      <div className="flex items-center space-x-5">
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative ${isActive ? "text-blue-600 font-bold" : ""}`
          }
        >
          <FaShoppingCart className="text-2xl hover:text-blue-500" />
          {itemCount > 0 && (
            <span className="absolute top-[-7px] right-[-9px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </NavLink>

        <Button
          onClick={toggleMode}
          variant="ghost"
          className="h-10 w-10 rounded-full transition-all"
        >
          {isDarkTheme ? (
            <BsFillCloudMoonFill size={25} className="text-yellow-400" />
          ) : (
            <FiSun size={25} className="text-yellow-500" />
          )}
        </Button>

        {user || admin ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-500">
                <AvatarImage src={ConorImg} alt="User Profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={isDarkTheme ? "bg-gray-800 text-white" : "bg-white"}
            >
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              {admin && (
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden md:flex gap-4">
            <Button
              variant="outline"
              className={`border-2 ${
                isDarkTheme
                  ? "border-white bg-blue-500 text-white hover:bg-white hover:text-blue-600"
                  : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
            >
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button
              className={`${
                isDarkTheme
                  ? "bg-white text-blue-600 hover:bg-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <MdMenu
              onClick={() => setOpen(true)}
              size={30}
              className="cursor-pointer hover:text-blue-500"
            />
          </SheetTrigger>
          <SheetContent
            side="right"
            className={`w-[250px] ${
              isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex flex-col items-start space-y-4 mt-6">
              {["Home", "Products", "Contacts"].map((item, index) => (
                <NavLink
                  onClick={handleClose}
                  key={index}
                  to={item == "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `text-lg hover:text-blue-500 ${
                      isActive ? "text-blue-600 font-bold" : ""
                    }`
                  }
                >
                  {item}
                </NavLink>
              ))}
              {admin && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-lg hover:text-blue-500 ${
                      isActive ? "text-blue-600 font-bold" : ""
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {user || admin ? (
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className={`border-2 ${
                      isDarkTheme
                        ? "border-white bg-blue-500 text-white hover:bg-white hover:text-blue-600"
                        : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    <Link to="/sign-in">Sign In</Link>
                  </Button>
                  <Button
                    onClick={handleClose}
                    className={`${
                      isDarkTheme
                        ? "bg-white text-blue-600 hover:bg-gray-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Link to="/sign-up">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
