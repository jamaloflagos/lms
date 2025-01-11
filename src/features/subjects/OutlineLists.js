import { useGetOutlinesQuery } from "./subjectsApiSlice";
import { Link } from "react-router-dom";

const OutlineLists = ({ classId, subjectId }) => {
  const {
    outlines = [], 
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOutlinesQuery(
    { class_id: classId, subject_id: subjectId },
    {
      selectFromResult: (result) => {
        const outlines = Object.values(result?.data?.entities);

        return {
          outlines,
          ...result,
        };
      },
    }
  );

  let content;

  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    const listItems = outlines.map((outline) => (
      <li>
        <Link to={''}> 
          <span>{outline.title}</span>
          <span>Week {outline.week}</span>
        </Link>
      </li>
    ));

    content = <ul>{listItems}</ul>;
  }
  return content;
};
export default OutlineLists;
