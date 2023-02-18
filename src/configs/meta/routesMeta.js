import { HOME_PATH, LOGIN_PATH } from "../../constants/routes";
import Leads from "../../pages/Leads";
import Login from "../../pages/Login";
import AuthGuard from "../../components/guard/AuthGuard";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

const routesMeta = [
  {
    path: HOME_PATH,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Leads />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: LOGIN_PATH,
    element: <Login />,
  },
  {
    path: "*",
    element: (
      <>
        <h1>Not found!</h1>
      </>
    ),
  },
];

export default routesMeta;
