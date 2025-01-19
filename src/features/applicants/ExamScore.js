import { Link } from "react-router-dom";
import { useGetEntranceExamScoreQuery } from "./applicantsApiSlice";

const ExamScore = ({ applicantId }) => {
    const {
      data: score, 
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetEntranceExamScoreQuery(applicantId);

    let content;
  
    if (isLoading) content = <p>Loading...</p>;
    if (isError && !error?.status === 404) content = <p>{error?.data?.detail}</p>;
    if (isError && error?.status === 404) {
      content = (
          <section>
            <p>You've not taken your entrance exam, go ahead and take it</p>
            <Link to={`/applicant/${applicantId}/entrance_exam`}>Take Exam</Link>
          </section>
      );
    }
    if (isSuccess) {
      content = (
          <section>
            <p>You've taken your entrance exam.</p>
            <p>Check your email for follow up!</p>
          </section>
      );
    }
  
    return content;
}
export default ExamScore