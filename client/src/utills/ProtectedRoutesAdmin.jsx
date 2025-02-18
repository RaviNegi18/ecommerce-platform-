import { Outlet, Navigate } from "react-router-dom";
export const ProtectedRouteForAdmin = () => {
  const admin = JSON.parse(localStorage.getItem("user"));
  return admin?.user?.email === "knupadhyay784@gmail.com" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
