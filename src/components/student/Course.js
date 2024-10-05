import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { useStudent } from "../../hooks/useStudent";
import LessonList from "./LessonList";
import { useState } from "react";

const Course = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const { courseId } = useParams();
  const { studentDetail } = useStudent();
  const { class_details } = studentDetail;

  const {
    data: course_detail,
    isLoading: courseIsLoading,
    isError: courseIsError,
    error: courseError,
  } = useCustomQuery(
    ["course", courseId],
    `http://127.0.0.1:8000/course/${courseId}`
  );
  const {
    data: modules,
    isLoading: moduleIsLoading,
    isError: moduleIsError,
    error: moduleError,
  } = useCustomQuery(
    ["course", courseId, class_details.id],
    `http://127.0.0.1:8000/class/${class_details.id}/courses/${courseId}/modules`
  );

  if (courseIsLoading || moduleIsLoading) return <div>Fetching data...</div>;
  if (courseIsError || moduleIsError)
    return (
      <div>
        Error fetching data due to: {courseError?.message || moduleError?.message}
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row gap-6 pt-20 px-12">
      {/* Left Section: Course Overview */}
      <div className="w-full md:w-2/3 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{course_detail.title}</h1>
          <p className="text-gray-600">{course_detail.description}</p>
        </div>

        {/* Tabs (Description, Syllabus) */}
        <div className="border-b border-gray-200">
          <ul className="flex space-x-6">
            <li className="text-blue-600 border-b-2 border-blue-600 pb-2">Syllabus</li>
            <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Description</li>
          </ul>
        </div>

        {/* Accordion for Modules */}
        <div className="space-y-4">
          {modules.length > 0 ? (
            modules.map((module, index) => (
              <div key={module.id} className="border rounded-md">
                <div
                  onClick={() => toggleAccordion(index)}
                  className="p-4 bg-gray-100 cursor-pointer flex justify-between items-center"
                >
                  <span className="text-gray-800 font-medium">
                    {module.title}
                  </span>
                  <span>{activeIndex === index ? "-" : "+"}</span>
                </div>
                <div
                  className={`px-4 py-2 transition-all duration-300 ${
                    activeIndex === index ? "max-h-screen" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <LessonList
                    moduleId={module.id}
                    classId={class_details.id}
                    courseId={courseId}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No modules available for this course yet.</p>
          )}
        </div>
      </div>

      {/* Right Section: Course Details */}
      <div className="w-full md:w-1/3">
        <div className="space-y-4">
          {/* Course Image and Preview */}
          <div className="relative">
            <img
              src={course_detail.image}
              alt={course_detail.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-medium">
              Preview this course
            </button>
          </div>

          {/* Course Stats */}
          <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl text-yellow-500">★</span>
              <span className="text-lg font-medium">{course_detail.rating}</span>
              <span className="text-gray-600">({course_detail.reviews} reviews)</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h6 className="text-lg font-medium text-gray-800">150</h6>
                <p className="text-gray-600 text-sm">Students</p>
              </div>
              <div className="text-center">
                <h6 className="text-lg font-medium text-gray-800">Intermediate</h6>
                <p className="text-gray-600 text-sm">Level</p>
              </div>
              <div className="text-center">
                <h6 className="text-lg font-medium text-gray-800">12 Modules</h6>
                <p className="text-gray-600 text-sm">Total</p>
              </div>
              <div className="text-center">
                <h6 className="text-lg font-medium text-gray-800">70 hrs</h6>
                <p className="text-gray-600 text-sm">Duration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
