import { Link } from "react-router-dom";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { useStudent } from "../../hooks/useStudent";

const Curriculum = () => {
  const { studentDetail } = useStudent();

  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useCustomQuery(
    ["courses", studentDetail.class_details.id],
    `https://lms-api-xi.vercel.app/class/${studentDetail.class_details.id}/courses`
  );

  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>Error fetching data due to {error.message}</div>;

  return (
    <div className="pt-20 px-12 h-full bg-lp-blue">
      {/* Heading Section */}
      <div className="pb-8">
        <h3 className="text-3xl font-semibold text-gray-800">Curriculum</h3>
        <p className="text-gray-600">Overview of your courses and syllabus</p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link
              key={course.id}
              to={`${course.title}/${course.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                {/* Course Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-52 object-cover"
                />
                {/* Status Badge */}
                <span
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full border-2 text-sm font-semibold ${
                    course.status === "Open"
                      ? "bg-grey-500 text-green"
                      : "bg-grey-500 text-yellow"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              {/* Course Details */}
              <div className="p-4">
                <h4 className="text-lg font-medium text-gray-800">
                  {course.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{course.creator}</p>

                {/* Modules and Total Hours */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2m4 0h1m1 0h-1m4 0v-2a1 1 0 00-1-1h-3a1 1 0 00-1 1v2m-1 0h1m0 0h-1m4 0h1m1 0h-1m4 0v-2a1 1 0 00-1-1h-3a1 1 0 00-1 1v2m-1 0h1m0 0h-1"
                      />
                    </svg>
                    <span>{course.modules_count} Modules</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m2 2h1m-1-4h1m-5 4h-1m5-4h-1m-7 4h-1m1-4H7m2 4h1m1-4h1m-7 0h1m1 0h1"
                      />
                    </svg>
                    <span>75 total hours</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">You have no courses uploaded yet!</p>
        )}
      </div>
    </div>
  );
};

export default Curriculum;
