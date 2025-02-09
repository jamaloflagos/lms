import { Link } from "react-router-dom";
import { useGetClassesQuery } from "./classesApiSlice";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";

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

  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (filteredClasses.length === 0 && classes.length > 0) {
      setFilteredClasses(classes);
    }
  }, [classes, filteredClasses]);

  const onSearchTermValueChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setFilteredClasses(classes);
    } else {
      setFilteredClasses(
        classes.filter((_class) =>
          _class.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const onFilterValueChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);

    if (value === "") {
      setFilteredClasses(classes);
    } else {
      setFilteredClasses(
        classes.filter((_class) => _class.category === value)
      );
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredClasses(classes);
  };

  let content;
  if (isLoading) content = <Spinner />;

  if (isError)
    content = <p className="text-center text-red-500">{error?.data?.message}</p>;

  if (isSuccess) {
    const listItems = filteredClasses.map((_class) => (
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
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-4 sm:space-y-0">
          <div className="flex items-center w-full sm:w-auto border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
            <i className="fa-solid fa-magnifying-glass px-3 text-gray-500"></i>
            <input
              type="text"
              id="search"
              placeholder="Search classes by name"
              value={searchTerm}
              onChange={onSearchTermValueChange}
              className="w-full px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="px-3 text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
          <select
            value={filterValue}
            onChange={onFilterValueChange}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Secondary">Secondary</option>
            <option value="Primary">Primary</option>
          </select>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {listItems}
        </ul>
      </div>
    );
  }

  return content;
};

export default ClassesList;
