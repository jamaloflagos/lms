import { Link } from 'react-router-dom'

const SubjectList = ({classId, studentId, subjects}) => {

  return (
    <div>
      {subjects.map((subject) => (
        <Link className="drpdown-btn" to={`/${studentId}/${classId}/subject/${subject}`}>{subject}</Link>
      ))}
    </div>
  );
};
export default SubjectList;
