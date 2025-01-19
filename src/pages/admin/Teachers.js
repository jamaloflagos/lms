import { Link } from "react-router-dom";
import TeachersList from "../../features/teachers/TeachersList";

const Teachers = () => {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-end items-center mb-6">
        <Link
          to="new"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Teacher
        </Link>
      </header>
      <article className="max-w-4xl mx-auto">
        <TeachersList />
      </article>
    </main>
  );
};

export default Teachers;
