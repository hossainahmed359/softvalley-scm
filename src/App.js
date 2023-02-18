import logo from "./logo.svg";
import "./App.css";
import { Children, useEffect } from "react";
import { userLogin } from "./services/api/queries/login";
import { privateAxios, setTokenInHeader } from "./services/axiosConfig";
import { leadTableData } from "./services/api/queries/lead";
import {
  leadSource,
  leadStatus,
  leadAssignee,
} from "./services/api/queries/leadFilters";
import { useRoutes } from "react-router-dom";
import routesMeta from "./configs/meta/routesMeta";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const content = useRoutes(routesMeta);

  return (
    <>
      <AuthProvider>{content}</AuthProvider>
    </>
  );
}

export default App;
