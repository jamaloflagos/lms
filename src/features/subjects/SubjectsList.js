import { useGetSubjectsQuery } from "./subjectsApiSlice";
import useAuth from "../../hooks/useAuth";
import OutlineLists from "../outlines/OutlineLists";
import { Link } from "react-router-dom";
import { useState } from "react";

const SubjectsList = () => {
  const { status, user_id: teacher_id, class_id } = useAuth();
  const subjectFilter = status === "Student" ? { class_id } : { teacher_id };
  const [activeAccordion, setActiveAccordion] = useState(null);

  const {
    subjects = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubjectsQuery({ subjectFilter, status }, {
    selectFromResult: (result) => {
      const subjects = Object.values(result?.data?.entities || {});
      return {
        subjects,
        ...result,
      };
    },
  });

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  let content;

  if (isLoading) content = <p className="text-gray-500 text-center">Loading...</p>;

  if (isError) content = <p className="text-red-500 text-center">{error?.data?.message}</p>;

  if (isSuccess) {
    let accordionItems;

    if (status === "Student") {
      accordionItems = subjects?.map((subject, index) => (
        <div key={index} className="border-b border-gray-300">
          <div
            className={`flex justify-between items-center py-3 px-4 cursor-pointer ${
              activeAccordion === index ? "bg-blue-50" : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-medium text-gray-800">{subject.name}</span>
            <Link
              to={`${subject.id}`}
              className="text-blue-500 hover:underline text-sm"
            >
              View Details
            </Link>
          </div>
          {activeAccordion === index && (
            <div className="px-4 pb-3">
              <OutlineLists subjectId={subject.id} classId={class_id} />
            </div>
          )}
        </div>
      ));
    } else if (status === "Teacher") {
      accordionItems = subjects.map((subject, index) => (
        <div key={index} className="border-b border-gray-300">
          <div
            className={`flex justify-between items-center py-3 px-4 cursor-pointer ${
              activeAccordion === index ? "bg-blue-50" : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-medium text-gray-800">
              {subject.subject_name}{" "}
              <span className="text-sm text-gray-600">({subject.class_name})</span>
            </span>
            <Link
              to={`${subject.id}`}
              className="text-blue-500 hover:underline text-sm"
            >
              View Details
            </Link>
          </div>
          {activeAccordion === index && (
            <div className="px-4 pb-3">
              <OutlineLists
                subjectId={subject.id.split("_")[1]}
                classId={subject.class_id}
              />
            </div>
          )}
        </div>
      ));
    }

    content = (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Subjects</h1>
        </header>
        <div>{accordionItems}</div>
      </div>
    );
  }

  return content;
};

export default SubjectsList;
