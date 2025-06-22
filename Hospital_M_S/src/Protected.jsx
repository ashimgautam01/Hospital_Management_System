import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, children, redirectPath = "/" }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
