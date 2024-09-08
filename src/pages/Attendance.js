import { useParams } from "react-router-dom";
import StudentList from "../components/StudentList";

const Attendance = () => {
    const { classId } = useParams(); 
    console.log('in attendance');
  return (
    <div>
        <StudentList classId={classId} context={'attendances'}/>
    </div>
  )
}
export default Attendance