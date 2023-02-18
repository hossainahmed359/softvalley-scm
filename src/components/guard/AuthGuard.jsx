import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../constants/routes";
import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate(LOGIN_PATH);
  }, [isAuthenticated, navigate]);


  if (!isAuthenticated && !isInitialized) {
    return <Navigate to={LOGIN_PATH} />;
  }


  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
