import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
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
  const isAuthenticated = getLocalStorage('token')
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard')
    } else {
      navigate('/auth/login')
    }
  }, [isAuthenticated, navigate])
}

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />

        <Route path="/auth" element={<AuthProteced/>}>
          <Route path="login" element={<AuthLayout><Login /></AuthLayout>} />
        </Route>

        <Route path="/admin" element={<DashboardProtected />}>
          <Route path="dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="adminmanagement" element={<DashboardLayout><AdminManagement /></DashboardLayout>} />
          <Route path="groupmanagement" element={<DashboardLayout><GroupManagement /></DashboardLayout>} />
          <Route path="calender" element={<DashboardLayout><Calendar /></DashboardLayout>} />
          <Route path="settings" element={<DashboardLayout><SystemSetting /></DashboardLayout>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
