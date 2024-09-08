import { useCustomQuery } from "../../hooks/useCustomQuery";
import { useStudent } from "../../hooks/useStudent";

const Dashboard = () => {
  const { studentDetail } = useStudent();
  const {data: assignments, isLoading: assignmentsIsLoading, isError: assignmentsIsError} = useCustomQuery(['assignments', studentDetail.class_details.id], `http://127.0.0.1:8000/class/${studentDetail.class_details.id}/assignments`);
  const {data: exams, isLoading: examsIsLoading, isError: examsIsError} = useCustomQuery(['exams', studentDetail.class_details.id], `http://127.0.0.1:8000/class/${studentDetail.class_details.id}/exams`);
  const {data: class_schedules, isLoading: classSchedulesIsLoading, isError: classSchedulesIsError} = useCustomQuery(['class-schedules', studentDetail.class_details.id], `http://127.0.0.1:8000/class/${studentDetail.class_details.id}/class-schedules`);
  
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Create a Date object for 14th November 1998
const date = new Date('1998-11-14');
const dayOfWeek = days[date.getDay()];

console.log(`The day on 14-11-1998 was: ${dayOfWeek}`);

  if (assignmentsIsLoading || examsIsLoading || classSchedulesIsLoading) return <div>Fetching data....</div>
  if (assignmentsIsError || examsIsError || classSchedulesIsError) return <div>Error fetching data</div>

  return (
    <div>
      <h3>Welcome (Student)</h3>
      <p></p>
      <div className="performance">
        <div>
          <h3>Subject-wise performance</h3>
          <button>See all</button>
        </div>
      </div>
      <div className="assignments">
        <div>
          <h3>Assignments</h3>
          <button>See all</button>
        </div>
        <div>
            {
                assignments > 0 ? (
                    assignments.map(assigment => (
                        <div>
                            <span>{assigment.course}</span>
                            <div>
                                <span>{assigment.due_date}</span>
                                <span>{assigment.due_time}</span>
                            </div>
                            <span>{assigment.status}</span>
                        </div>
                    ))
                ) : <p>No assignments uploaded yet</p>
            }
        </div>
      </div>
      <div className="class-schedule">
        <h3>Class Schedule</h3>
        <div className="calendar"></div>
        <div>
          <div>
            <p>Date</p>
            <button>See all</button>
          </div>
          <div>
            {
                class_schedules.length > 0 ? (
                    class_schedules.map(schedule => (
                        <div>
                            <div>
                                <div>
                                    <span>{schedule.start_time}-<span>{schedule.end_time}</span></span>
                                </div>
                                <div>
                                    <span>{schedule.course}-<span>{schedule.lesson}</span></span>
                                </div>
                                <p>By {schedule.tutor}</p>
                            </div>
                            <button>Join Class</button>
                        </div>
                    ))
                ) : <p>No new schedules</p>
            }
          </div>
        </div>
      </div>
      <div className="upcoming-exam">
        <div>
          <h3>Upcoming Exam</h3>
          <button>See all</button>
        </div>
        <div>
            {
                exams.length > 0 ? (
                    exams.map(exam => (
                    <div>
                        <div>
                            <span>{exam.date}</span>
                        </div>
                        <div>
                            <span>{exam.course}</span>
                            <span>{exam.category}</span>
                        </div>
                        <div>
                            <div><span>{exam.start_time}</span>-<span>{exam.end_time}</span></div>
                            <span>{days[new Date(exam.date).getDay()]}</span>
                        </div>
                        <button>Join Exam</button>
                    </div>
                    ))
                ) : <p>No exams uploaded</p>
            }
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
