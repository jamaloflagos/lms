import { useGetSubjectsQuery } from "./subjectsApiSlice";
import useAuth from "../../hooks/useAuth";
import OutlineLists from "./OutlineLists";

const SubjectsList = () => {
  const { status, user_id: teacher_id, class_id } = useAuth();
  const subjectFilter = status === "Student" ? { class_id } : { teacher_id };
  const {
    subjects = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubjectsQuery(subjectFilter, {
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
      accordionItems = subjects?.map((subject) => (
        <div>
          <div>{subject.name}</div>
          <OutlineLists subjectId={subject.id} classId={class_id} />
        </div>
      ));
    } else if (status === "Teacher") {
      accordionItems = subjects.map((subject) => (
        <div>
          <div>{subject.name}</div>
          <OutlineLists subjectId={subject.id} classId={subject._class.id} />
        </div>
      ));
    }

    content = (
      <>
        <article>
          <header>Subjects</header>
          <div>{accordionItems}</div>
        </article>
      </>
    );
  }
  return content;
};
export default SubjectsList;
