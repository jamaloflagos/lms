import { useCustomQuery } from "../hooks/useCustomQuery"
import QuizScores from "../components/QuizScores";
import ExamScore from "../components/ExamScore";

const Student = () => {
    const { data: student, isLoading, isError, error } = useCustomQuery(['student', '']);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching student due to {error.message}</div>

  return (
    <div>
        {
            <div>
              <span>{student.first_name} {student.last_name}</span>
            </div>
        }

        <div>
            <h5>Performances</h5>
            
            <div>
                <h5>Quiz scores in each subject</h5>
                {
                    student._class.subjects.map(subject => (
                        <div>
                            <h1>{subject}</h1>
                            <QuizScores subject={subject} studentId={student.id}/>
                        </div>
                    ))
                }
            </div>

            <div>
                <h5>Exam scores in each subject</h5>
                {
                    student._class.subjects.map(subject => (
                        <div>
                            <h6>{subject}</h6>
                            <ExamScore subject={subject} studentId={student.id}/>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
export default Student