import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../constants/routes";
import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    isInitialized && setIsLoading(false)
   },[isInitialized])


  if (isInitialized && !isAuthenticated) {
    return <Navigate to={LOGIN_PATH} />;
  }


  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
