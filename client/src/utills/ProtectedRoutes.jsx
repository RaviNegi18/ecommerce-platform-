import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      alert("Please login first to access this page");
    }
  }, [user]);

  return user ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
