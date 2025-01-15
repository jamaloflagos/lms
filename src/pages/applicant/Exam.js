import { useParams } from "react-router-dom";
import EntranceExam from "../../features/applicants/EntanceExam";

export const Exam = () => {
    const { id: applicantId } = useParams()
    
  return <EntranceExam id={applicantId} />
}