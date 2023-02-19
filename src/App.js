// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
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
