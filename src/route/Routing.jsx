import {

  useNavigate,
  createBrowserRouter,
} from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Dashboard from "../page/admin/Dashboard";
import Login from "../page/auth/Login";
import GroupManagement from "../page/admin/GroupManagement";
import AdminManagement from "../page/admin/AdminManagement";
import SystemSetting from "../page/admin/SystemSetting";
import Calendar from "../page/admin/Calendar";
import DashboardLayout from "../layout/DashboardLayout";
import AuthProteced from "../authenticat/AuthProteced";
import { getLocalStorage } from "../utils/LocalStorageUtills";
import DashboardProtected from "../authenticat/DashboardProtected";
import { useEffect } from "react";

const Root = () => {
  const navigate = useNavigate();
  const isAuthenticated = getLocalStorage("token");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    } else {
      navigate("/auth/login");
    }
  }, [isAuthenticated, navigate]);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/auth",
    element: <AuthProteced />,
    children: [
      {
        path: "login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardProtected />,
    children: [
      {
        path: "dashboard",
        element: (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        ),
      },
      {
        path: "adminmanagement",
        element: (
          <DashboardLayout>
            <AdminManagement />
          </DashboardLayout>
        ),
      },
      {
        path: "groupmanagement",
        element: (
          <DashboardLayout>
            <GroupManagement />
          </DashboardLayout>
        ),
      },
      {
        path: "calendar",
        element: (
          <DashboardLayout>
            <Calendar />
          </DashboardLayout>
        ),
      },
      {
        path: "settings",
        element: (
          <DashboardLayout>
            <SystemSetting />
          </DashboardLayout>
        ),
      },
    ],
  },
]);

export default router;

