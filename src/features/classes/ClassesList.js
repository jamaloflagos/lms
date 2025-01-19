import { Link } from "react-router-dom";
import { useGetClassesQuery } from "./classesApiSlice";

const ClassesList = () => {
  const { classes = [], isLoading, isSuccess, isError, error } = useGetClassesQuery(undefined, {
    selectFromResult: (result) => {
      const classes = Object.values(result?.data?.entities || {});
      return {
        ...result,
        classes,
      };
    },
  });

  let content;
  if (isLoading) content = <p className="text-center text-gray-500">Loading...</p>;

  if (isError)
    content = <p className="text-center text-red-500">{error?.data?.message}</p>;

  if (isSuccess) {
    const listItems = classes.map((_class) => (
      <li
        key={_class.id}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 space-y-2 border border-gray-200"
      >
        <Link
          to={`${_class.id}`}
          className="block text-blue-600 hover:underline"
        >
          <span className="block text-lg font-semibold">{_class.name}</span>
          <span className="block text-sm text-gray-500">
            Category: {_class.category}
          </span>
          <span className="block text-sm text-gray-500">
            Students: {_class.students}
          </span>
        </Link>
      </li>
    ));

    content = (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {listItems}
      </ul>
    );
  }

  return content;
};

export default ClassesList;
