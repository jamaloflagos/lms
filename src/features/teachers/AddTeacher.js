import { useState } from "react";
import { useGetClassesQuery } from "../classes/classesApiSlice";
import { useGetSubjectsQuery } from "../subjects/subjectsApiSlice";
import NewTeacherForm from "./NewTeacherForm";

const AddTeacher = () => {
  const { subjects = [] } = useGetSubjectsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      subjects: Object.values(data?.entities || {}).map((subject) => ({
        id: subject.id,
        name: subject.name,
      })),
    }),
  });

  const { classes: allClasses = [] } = useGetClassesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      classes: Object.values(data?.entities || {}).map((_class) => ({
        id: _class.id,
        name: _class.name,
      })),
    }),
  });

  // State to hold the subjectId for fetching specific classes
  const [selectedSubjectId, setSelectedSubjectId] = useState(1);

  // Conditionally fetch classes based on the selected subject
  const { classes: filteredClasses = [] } = useGetClassesQuery(selectedSubjectId, {
    skip: !selectedSubjectId, // Skip query if no subjectId is selected
    selectFromResult: ({ data }) => ({
      classes: Object.values(data?.entities || {}).map((_class) => ({
        id: _class.id,
        name: _class.name,
      })),
    }),
  });

  // Function to update the selected subjectId dynamically
  const fetchClassesForSubject = (subjectId) => {
    setSelectedSubjectId(subjectId);
  };

  const content = (
    <NewTeacherForm
      allClasses={allClasses}
      fetchClassesForSubject={fetchClassesForSubject}
      sch_subjects={subjects}
      filteredClasses={filteredClasses} // Pass the filtered classes to the form
    />
  );
  return content;
};

export default AddTeacher;
