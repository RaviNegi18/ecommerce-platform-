import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { showInfoToast } from "@/utills/ToastUtills";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      showInfoToast("Please login first to access this page");
    }
  }, [user]);

  return user ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
