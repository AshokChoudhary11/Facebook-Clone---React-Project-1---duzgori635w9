// @ts-nocheck
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Provider/hooks";

export const AuthNavigator = ({ children }) => {
  const { user } = useAuth();
  if (!user.token) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};
