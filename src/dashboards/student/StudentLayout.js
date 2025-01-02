import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

const StudentLayout = () => {
  return (
    <div>
        <Sidebar />
        <Header />
        <Outlet />
    </div>
  )
}
export default StudentLayout