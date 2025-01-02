import { useParams } from "react-router-dom";
import StudentList from "../components/StudentList";

const Attendance = () => {
    const { classId } = useParams(); 
  return (
    <main>
        <StudentList classId={classId} context={'attendances'}/>
    </main>
  )
}
export default Attendance