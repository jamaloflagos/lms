import { useParams } from "react-router-dom";
import SingleClass from "../../features/classes/SingleClass";

const Class = () => {
  const { id } = useParams();

  return (
    <article className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
      <SingleClass id={id} />
    </article>
  );
};

export default Class;
