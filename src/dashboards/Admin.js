import ClassList from "../components/ClassList"
import TeacherList from "../components/TeacherList"

const Admin = () => {
  return (
    <div>
        <div>
            <h5>Teachers</h5>
            <TeacherList />
        </div>

        <div>
            <h5>Classes</h5>
            <ClassList />
        </div>
    </div>
  )
}
export default Admin