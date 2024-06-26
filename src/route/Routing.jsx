import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Dashboard from "../page/admin/Dashboard";
import Login from "../page/auth/Login";
import GroupManagement from "../page/admin/GroupManagement";
import AdminManagement from "../page/admin/AdminManagement";
import SystemSetting from "../page/admin/SystemSetting";
import Calendar from "../page/admin/Calendar";
import DashboardLayout from "../layout/DashboardLayout";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/adminmanagement" element={<DashboardLayout><AdminManagement /></DashboardLayout>} />
          <Route path="/groupmanagement" element={<DashboardLayout><GroupManagement /></DashboardLayout>} />
          <Route path="/calender" element={<DashboardLayout><Calendar /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><SystemSetting /></DashboardLayout>} />
          <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
