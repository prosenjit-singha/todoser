import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { loading, user } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (user && user.uid) return children;
  return <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;
