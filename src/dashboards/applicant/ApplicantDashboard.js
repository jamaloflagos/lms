import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetEntranceExamScoreQuery } from "../../features/applicants/applicantsApiSlice";

const ApplicantDashboard = () => {
  const { user_id: applicantId, username } = useAuth();

  const {
    data: score,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEntranceExamScoreQuery(applicantId);
  console.log(error?.data);
  let content;

  if (isLoading) content = <p>Loading...</p>;
  if (isError && !error?.status === 404) content = <p>{error?.data?.detail}</p>;
  if (isError && error?.status === 404) {
    content = (
      <article>
        <header>
          <h1>Welcome, {username}</h1>
        </header>
        <section>
          <p>You've not taken your entrance exam, go ahead and take it</p>
          <Link to={`/applicant/${applicantId}/entrance_exam`}>Take Exam</Link>
        </section>
      </article>
    );
  }
  if (isSuccess) {
    content = (
      <article>
        <header>
          <h1>Welcome, {username}</h1>
        </header>
        <section>
          <p>You've taken your entrance exam.</p>
          <p>Your obtained score is {score?.value}</p>
        </section>
      </article>
    );
  }

  return content;
};
export default ApplicantDashboard;
