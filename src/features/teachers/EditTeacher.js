import { useGetClassesQuery } from "../classes/classesApiSlice";
import { useGetTeachersQuery } from "./teachersApiSlice";
import EditTeacherForm from "./EditTeacherForm";
import { useState } from "react";
import { useGetSubjectsQuery } from "../subjects/subjectsApiSlice";

export const EditTeacher = ({ id }) => {
  const [subjectId, setSubjectId] = useState(1);
  const { subjects = [] } = useGetSubjectsQuery(undefined, {
    selectFromResult: ({ data }) => {
      const subjects = Object.values(data?.entities || {}).map((subject) => ({
        id: subject.id,
        name: subject.name,
      }));

      return {
        subjects,
      };
    },
  });
  const { classes: filteredClasses = [] } = useGetClassesQuery(subjectId, {
    selectFromResult: ({ data }) => {
      const classes = Object.values(data?.entities || {}).map((_class) => ({
        id: _class.id,
        name: _class.name,
      }));
      return {
        classes,
      };
    },
  });
  const { classes: allClasses = [] } = useGetClassesQuery(undefined, {
    selectFromResult: ({ data }) => {
      const classes = Object.values(data?.entities || {}).map((_class) => ({
        id: _class.id,
        name: _class.name,
      }));
      return {
        classes,
      };
    },
  });

  const { teacher } = useGetTeachersQuery("teachersList", {
    selectFromResult: ({ data }) => ({
      teacher: data?.entities[id],
    }),
  });

  const content = (
    <EditTeacherForm
      allClasses={allClasses}
      filteredClasses={filteredClasses}
      sch_subjects={subjects}
      setSubjectId={setSubjectId}
      teacher={teacher}
    />
  );
  return content;
};
