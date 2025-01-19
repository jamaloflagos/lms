import ClassesList from "../../features/classes/ClassesList";

const Classes = () => {
  return (
    <article className="p-6 space-y-6">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-blue-600">All Classes</h1>
        <p className="text-sm text-gray-500">View and manage all classes in the system</p>
      </header>
      <ClassesList />
    </article>
  );
};

export default Classes;
