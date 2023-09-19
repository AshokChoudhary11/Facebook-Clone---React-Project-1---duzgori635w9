import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

export const AuthNavigator = ({ children }) => {
  const { user } = useAuth();
  if (!user.token) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};
