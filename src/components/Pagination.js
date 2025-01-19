import React from "react";

const Pagination = ({
  totalQuestions,
  questionsPerPage,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const nPage = Math.ceil(totalQuestions / questionsPerPage);

  for (let i = 1; i <= nPage; i++) {
    pageNumbers.push(i);
  }

  const prev = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < nPage) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-4">
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            onClick={prev}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            } w-full sm:w-auto`}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-md ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-blue-100"
              } w-full sm:w-auto`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={next}
            disabled={currentPage === nPage}
            className={`px-6 py-3 rounded-md ${
              currentPage === nPage
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            } w-full sm:w-auto`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
