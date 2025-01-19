import useAuth from "../../hooks/useAuth";
import ExamScore from "../../features/applicants/ExamScore";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { user_id: applicantId, username, has_made_payment } = useAuth();


  let content;

    content = (
      <article>
        <header>
          <h1>Welcome, {username}</h1>
          <h2>Okay</h2>
        </header>
        {has_made_payment ? <ExamScore applicantId={applicantId} /> : <Link to={'payments'}>Make Payment</Link>}
      </article>
    );

  return content;
};
