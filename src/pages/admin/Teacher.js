import { useParams } from "react-router-dom";
import SingleTeacher from "../../features/teachers/SingleTeacher";

const Teacher = () => {
  const { id } = useParams();

  return (
    <main className="p-8 bg-white rounded-lg shadow-lg">
      <article>
        <SingleTeacher id={id} />
      </article>
    </main>
  );
};

export default Teacher;
