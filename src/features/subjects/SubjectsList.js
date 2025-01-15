import { useGetSubjectsQuery } from "./subjectsApiSlice";
import useAuth from "../../hooks/useAuth";
import OutlineLists from "../outlines/OutlineLists";
import { Link } from "react-router-dom";

const SubjectsList = () => {
  const { status, user_id: teacher_id, class_id } = useAuth();
  const subjectFilter = status === "Student" ? { class_id } : { teacher_id };
  const {
    subjects = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubjectsQuery({subjectFilter, status}, {
    selectFromResult: (result) => {
      const subjects = Object.values(result?.data?.entities || {});
      return {
        subjects,
        ...result,
      };
    },
  });

  let content;
  if (isLoading) content = <p>Loading....</p>;
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    let accordionItems;
    if (status === "Student") {
      accordionItems = subjects?.map((subject, index) => (
        <div key={index}>
          <div>
            <div>{subject.name}</div>
            <Link to={`${subject.id}`}>Goto</Link>
          </div>
          <OutlineLists subjectId={subject.id} classId={class_id} />
        </div>
      ));
    } else if (status === "Teacher") {
      accordionItems = subjects.map((subject, index) => (
        <div key={index}>
          <div>
            <div>{subject.subject_name}</div>
            <Link to={`${subject.id}`}>Goto{subject.id}</Link>
          </div>
          <OutlineLists subjectId={subject.id.split("_")[1]} classId={subject.class_id} />
        </div>
      ));
    }

    content = (
      <>
        <article>
          <header>
            <h1>Subjects</h1>
          </header>
          <div>{accordionItems}</div>
        </article>
      </>
    );
  }
  return content;
};
export default SubjectsList;
