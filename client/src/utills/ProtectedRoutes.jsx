import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = true;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
