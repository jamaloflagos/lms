import { Link } from "react-router-dom";
import { useGetTeachersQuery } from "./teachersApiSlice";

const SingleTeacher = ({ id }) => {
  const { teacher } = useGetTeachersQuery("teachersList", {
    selectFromResult: ({ data }) => ({
      teacher: data?.entities[id],
    }),
  });

  let content;

  if (teacher) {
    const listItems = teacher.subjects.map((subject) => (
      <li
        key={subject.id}
        className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold text-blue-700">{subject.name}</h3>
        <p className="text-gray-600">
          <strong>Classes taught:</strong> {subject.classes.join(", ")}
        </p>
      </li>
    ));

    content = (
      <section className="p-6 bg-gray-50 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              {teacher.first_name} {teacher.last_name}
            </h1>
            {teacher.is_form_teacher && (
              <p className="text-sm text-gray-600">
                <strong>Form Class:</strong> {teacher.form_class_details?.name}
              </p>
            )}
          </div>
          <Link
            to={`edit`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit
          </Link>
        </header>

        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Subjects Taught</h2>
          {listItems.length > 0 ? (
            <ul className="space-y-4">{listItems}</ul>
          ) : (
            <p className="text-gray-500">No subjects assigned yet.</p>
          )}
        </div>
      </section>
    );
  } else {
    content = (
      <p className="text-center text-gray-500">
        Teacher information not available.
      </p>
    );
  }

  return content;
};

export default SingleTeacher;
