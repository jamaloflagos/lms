import { useParams } from "react-router-dom";
import { useGetClassesQuery } from "../classes/classesApiSlice";
import { useGetTeachersQuery } from "./teachersApiSlice";
import EditTeacherForm from "./EditTeacherForm";

const EditTeacher = () => {
  const { id } = useParams();
  const { classes } = useGetClassesQuery("classesList", {
    selectFromResult: ({ data }) => {
      const classes = Object.values(data?.entities).map((_class) => ({
        id: _class.id,
        title: _class.title,
      }));

      return classes;
    },
  });

  const { teacher } = useGetTeachersQuery("teachersList", {
    selectFromResult: ({ data }) => ({
      teacher: data?.entities[id],
    }),
  });

  const content = <EditTeacherForm classes={classes} teacher={teacher} />;
  return content;
};
export default EditTeacher;
