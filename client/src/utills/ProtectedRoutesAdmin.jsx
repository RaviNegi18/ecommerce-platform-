import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
export const ProtectedRouteForAdmin = () => {
  const Admin = useSelector((state) => state.auth.admin);
  console.log("Admin is here", Admin);
  return Admin ? <Outlet /> : <Navigate to="/login" />;
};
