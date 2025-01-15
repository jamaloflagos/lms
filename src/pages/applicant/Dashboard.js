import useAuth from "../../hooks/useAuth";
import ExamScore from "../../features/applicants/ExamScore";

export const Dashboard = () => {
  const { user_id: applicantId, username } = useAuth();


  let content;

    content = (
      <article>
        <header>
          <h1>Welcome, {username}</h1>
        </header>
        <ExamScore applicantId={applicantId} />
      </article>
    );

  return content;
};
