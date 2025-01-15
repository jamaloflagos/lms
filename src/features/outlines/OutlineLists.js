import { useGetOutlinesQuery } from "./outlinesApiSlice";
import { Link } from "react-router-dom";

const OutlineLists = ({ classId, subjectId }) => {
  const {
    outlines = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOutlinesQuery(
    { class_id: classId, subject_id: Number(subjectId) },
    {
      selectFromResult: (result = {}) => ({
        outlines: Object.values(result?.data?.entities || {}),
        ...result,
      }),
    }
  );

  let content;

  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    const listItems = outlines.map((outline) => (
      <li>
        <Link to={`${subjectId}/outlines/${outline.id}/${classId}`}>
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
