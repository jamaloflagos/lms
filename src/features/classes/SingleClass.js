import { useGetClassesQuery } from "./classesApiSlice";
import StudentsList from "../students/StudentsList";

const SingleClass = ({ id }) => {
  const { _class } = useGetClassesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      _class: data?.entities[id],
    }),
  });

  let content;
  if (_class) {
    content = (
      <div className="p-6 bg-white shadow-md rounded-lg">
        {/* Class Header */}
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-600 text-white rounded-t-lg p-4 shadow">
          <h1 className="text-2xl font-bold">
            {_class.name} <span className="text-sm">({_class.category})</span>
          </h1>
          <span className="text-lg font-semibold bg-blue-800 py-1 px-3 rounded-md">
            {_class.students} Students
          </span>
        </header>

        {/* Class Content */}
        <section className="mt-4">
          {/* <h2 className="text-xl font-semibold mb-4 text-blue-600">Students</h2> */}
          <StudentsList classId={_class.id} />
        </section>
      </div>
    );
  } else {
    content = (
      <div className="p-6 bg-gray-100 text-gray-600 text-center rounded-lg shadow-md">
        <p>Class not found.</p>
      </div>
    );
  }

  return content;
};

export default SingleClass;
