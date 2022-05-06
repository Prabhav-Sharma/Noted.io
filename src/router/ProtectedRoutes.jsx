import React, { useEffect } from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
function ProtectedRoutes() {
  const {
    authState: { isAuthenticated },
  } = useAuth();

  useEffect(() => {
    !isAuthenticated && toast.info("You need to login first!");
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
export default ProtectedRoutes;
