import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../Login";
import GroupManagement from "../GroupManagement";
import AdminManagement from "../AdminManagement";
import UserManagement from "../UserManagement";
import SystemSetting from "../SystemSetting";
import Calendar from "../Calendar";
import AuthLayout from "../layout/AuthLayout";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<UserManagement />} />
          <Route path="/groupmanagement" element={<GroupManagement />} />
          <Route path="/systemsetting" element={<SystemSetting />} />
          <Route path="/calender" element={<Calendar />} />
          <Route path="/adminmanagement" element={<AdminManagement />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
