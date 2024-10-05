import { Link } from "react-router-dom";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { useStudent } from "../../hooks/useStudent";

const Dashboard = () => {
  const { studentDetail } = useStudent();
  const {
    data: tests,
    isLoading: testsIsLoading,
    isError: testsIsError,
  } = useCustomQuery(
    ["tests", studentDetail.class_details.id],
    `http://127.0.0.1:8000/class/${studentDetail.class_details.id}/tests`
  );
  const {
    data: exams,
    isLoading: examsIsLoading,
    isError: examsIsError,
  } = useCustomQuery(
    ["exams", studentDetail.class_details.id],
    `http://127.0.0.1:8000/class/${studentDetail.class_details.id}/exams`
  );
  const {
    data: class_schedules,
    isLoading: classSchedulesIsLoading,
    isError: classSchedulesIsError,
  } = useCustomQuery(
    ["class-schedules", studentDetail.class_details.id],
    `http://127.0.0.1:8000/class/${studentDetail.class_details.id}/class-schedules`
  );

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (testsIsLoading || examsIsLoading || classSchedulesIsLoading)
    return <div>Fetching data....</div>;
  if (testsIsError || examsIsError || classSchedulesIsError)
    return <div>Error fetching data</div>;

  return (
    <div className="h-screen p-10 bg-lp-blue">
      {/* Header Section */}
      <div className="pb-8">
        <h3 className="text-3xl font-semibold">Welcome {studentDetail.first_name}!</h3>
        <p className="text-gray-600">
          Explore your personalized dashboard to keep track of your classes, tests, and performance.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subject-wise performance */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Subject-wise performance</h3>
            <select className="border border-gray-300 rounded p-2 text-gray-700">
              <option>Select year</option>
              {/* Add more years if needed */}
            </select>
          </div>
          {/* Bar Chart Placeholder */}
          <div className="h-40 bg-gray-50 flex items-center justify-center text-gray-400">
            Performance Chart Here
          </div>
        </div>

        {/* Class Schedule */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-medium mb-4">Class Schedule</h3>
          {/* Calendar Placeholder */}
          <div className="bg-gray-50 h-40 flex items-center justify-center text-gray-400 mb-4">
            Calendar Here
          </div>
          {/* List of class schedules */}
          {
            class_schedules && (
              class_schedules.length > 0 ? (
                class_schedules.map((schedule) => (
                  <div key={schedule.id} className="mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700">{schedule.date}</span>
                      <button className="text-blue-500">Join class</button>
                    </div>
                    <p className="text-gray-600">{schedule.course} - {schedule.lesson}</p>
                    <p className="text-sm text-gray-500">By {schedule.tutor}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No class schedules available.</p>
              )
            )
          }
        </div>

        {/* tests Section */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Unit Tests</h3>
            <Link to={"tests"} className="text-blue-500">See all</Link>
          </div>
          {
            tests && (
              tests.length > 0 ? (
                tests.map((testt) => (
                  <div key={testt.id} className="mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700">{testt.course}</span>
                      <span className={`text-sm ${testt.status === 'Overdue' ? 'text-red-500' : testt.status === 'Submitted' ? 'text-green-500' : 'text-yellow-500'}`}>
                        {testt.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{testt.due_date} - {testt.due_time}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No tests uploaded yet.</p>
              )
            )
          }
        </div>

        {/* Upcoming Exam Section */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Upcoming Exam</h3>
            <Link to={"exams"} className="text-blue-500">See all</Link>
          </div>
          {
            exams && (
              exams.length > 0 ? (
                exams.map((exam) => (
                  <div key={exam.id} className="mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700">{exam.date}</span>
                      <button className="text-blue-500">Join Exam</button>
                    </div>
                    <p className="text-gray-600">{exam.course} - {exam.category}</p>
                    <p className="text-sm text-gray-500">{days[new Date(exam.date).getDay()]}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No upcoming exams available.</p>
              )
            )
          }
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
