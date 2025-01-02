import { Link, Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div>
      <nav>
        <Link to="dashboard">Dashboard</Link>
        <Link to="teachers">Teachers</Link>
        <Link to="teachers/new">Create Teachers</Link>
        <Link to="classes">Classes</Link>
        <Link to="classes/new">Create Teachers</Link>
      </nav>
      <Outlet />
    </div>
  )
}
export default AdminLayout