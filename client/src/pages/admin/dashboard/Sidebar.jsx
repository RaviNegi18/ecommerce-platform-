import React, { useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { logoutAsAdmin } from "@/redux/api/authSlice";
import {
  FaBars,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import myContext from "@/context/data/myContext";

const Sidebar = () => {
  console.log("Sidebar is rendering");

  useEffect(() => {
    console.log("Sidebar mounted");
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { mode } = useContext(myContext);
  console.log("Mode is here:", mode);

  const isDarkMode = mode === "dark";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logoutAsAdmin());
      navigate("/sign-in");
      setIsMobileOpen(false); // Close sidebar on mobile
    }
  };

  const handleNavClick = () => {
    setIsMobileOpen(false); // Close sidebar when clicking a link
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <Button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <FaBars size={24} />
      </Button>

      <aside
        className={`h-screen fixed top-0 left-0 z-40 transition-all duration-300 p-4 
        ${collapsed ? "w-20" : "w-64"} 
        ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} 
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center">
          <h1
            className={`text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text ${
              collapsed ? "hidden" : "block"
            }`}
          >
            Control Center
          </h1>

          <Button
            onClick={() => setCollapsed(!collapsed)}
            variant="ghost"
            className="hidden md:block"
          >
            <FaBars size={24} />
          </Button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard"
                end
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isDarkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <MdDashboard size={24} />
                {!collapsed && <span>Overview</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/products"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isDarkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <FaBox size={24} />
                {!collapsed && <span>Products</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/orders"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isDarkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <FaShoppingCart size={24} />
                {!collapsed && <span>Orders</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/users"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isDarkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <FaUsers size={24} />
                {!collapsed && <span>Users</span>}
              </NavLink>
            </li>
            <li>
              <button
                className={`flex items-center gap-4 p-3 w-full rounded-lg transition-colors duration-200 ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                } text-red-500`}
                onClick={handleLogout}
              >
                <FaSignOutAlt size={24} />
                {!collapsed && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Background Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
