import { Route } from "react-router-dom";
import Student from "../dashboards/Student";
import Dashboard from "../components/student/Dashboard";
import Curriculum from "../components/student/Curriculum";
import Reports from "../components/student/Reports";
const StudentRoutes = () => {
  return (
    <Route element={<Student />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="curriculum" element={<Curriculum />} />
        <Route path="reports" element={<Reports />} />
        {/* Optionally, you can add a default route or a redirect */}
        <Route index element={<Dashboard />} />
    </Route>
  )
}
export default StudentRoutes