import React from "react";
import useAuth from "../hooks/useAuth";

const Leads = () => {
  const { signOut, isAuthenticated, isInitialized } = useAuth();
  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
      Leads
    </div>
  );
};

export default Leads;
