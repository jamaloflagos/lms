import { Link } from 'react-router-dom';
import { useCustomQuery } from '../hooks/useCustomQuery'
import { useAuth } from '../hooks/useAuth';

const Teacher = () => {
  const { userId } = useAuth(); 
  const { data: teacher, isLoading, isError, error } = useCustomQuery(['teacher', ], `http://127.0.0.1:8000/teachers/${userId}`);
  console.log(teacher)
    if (isLoading) return <div>Loading data...</div>
    if (isError) return <div>{error.message}</div>
    const classSet = new Set();
    const subjectSet = new Set();
    teacher.subjects.forEach(subject => {
      return subject.classes.forEach(_class => classSet.add(_class))
    })
    teacher.subjects.forEach(subject => {
      return subjectSet.add(subject.name)
    })
    localStorage.setItem('classSet', JSON.stringify([...classSet]));
    localStorage.setItem('subjectSet', JSON.stringify([...subjectSet]));
    console.log(classSet);
  return (
    <div>
      <nav>
        <h1>Welcome, {teacher.first_name} {teacher.last_name}</h1>
        {teacher.is_form_teacher && <h1>{teacher.form_class_details.name}</h1>}
        <button>Logout</button>
      </nav>

      <div>
        {
          teacher.subjects.map((subject, index) => (
            <div key={index}><Link to={`/subject/${subject.name}/${teacher.id}`}>{subject.name}</Link></div>
          ))
        }

        {teacher.is_form_teacher && <Link to={`/attendances/class/${teacher.form_class_details.id}`}>Attendance</Link>}
      </div>
    </div>
  )
}
export default Teacher