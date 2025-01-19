import { Link } from "react-router-dom"
export const Dashboard = () => {
  return (
    <div>
      <Link to={"/admin/terms/new"}>Create term</Link>
    </div>
  )
}
