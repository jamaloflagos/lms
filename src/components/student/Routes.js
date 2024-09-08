import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import Curriculum from "./Curriculum";
import Reports from "./Reports";
import Account from "./Account";
import StudentInfoForm from "./StudentInfoForm";
import ParentInfoForm from "./ParentInfoForm";
import AccountSetting from "./AccountSetting";
import NotificationSetting from "./NotificationSetting";
import Course from "./Course";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="curriculum" element={<Curriculum />} />
        <Route path="reports" element={<Reports />} />
        <Route path="account" element={<Account />}>
          <Route path="my-details" element={<StudentInfoForm />} />
          <Route path="parent-details" element={<ParentInfoForm />} />
          <Route path="account-settings" element={<AccountSetting />} />
          <Route
            path="notification-settings"
            element={<NotificationSetting />}
          />
          <Route index element={<StudentInfoForm />} />
        </Route>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="curriculum/:course/:courseId" element={<Course />} />
    </Routes>
  );
};
export default StudentRoutes;
