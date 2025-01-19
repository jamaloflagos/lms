import useAuth from "../../hooks/useAuth";
import { useGetOutlinesQuery } from "./outlinesApiSlice";
import { Link } from "react-router-dom";

const OutlineLists = ({ classId, subjectId }) => {
  const { status } = useAuth()
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

  if (isLoading) content = <p className="text-gray-600">Loading...</p>;

  if (isError) content = <p className="text-red-500">{error?.data?.message}</p>;

  if (isSuccess) {
    if (outlines.length === 0) {
      content = (
        <div className="text-center py-4 bg-gray-50 rounded-md shadow-sm">
          <p className="text-gray-600 font-medium">
            No outlines are available for this subject.
          </p>
        </div>
      );
    } else {
      const listItems = outlines.map((outline) => (
        <li
          key={outline.id}
          className="border-b last:border-none py-3 px-4 hover:bg-gray-50 transition duration-200"
        >
          <Link
            to={`/${status?.toLowerCase()}/subjects/${subjectId}/outlines/${outline.id}/${classId}`}
            className="flex justify-between items-center text-blue-600 hover:text-blue-800"
          >
            <span className="font-medium">{outline.title}</span>
            <span className="text-gray-500">Week {outline.week}</span>
          </Link>
        </li>
      ));

      content = (
        <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          {listItems}
        </ul>
      );
    }
  }

  return content;
};

export default OutlineLists;
