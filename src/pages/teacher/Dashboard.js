import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Notes</h2>
          <p>Create and manage lecture notes for your subjects.</p>
          <Link to="" className="text-blue-600">Create Note</Link>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Outlines</h2>
          <p>Plan and organize subject outlines.</p>
          <Link to="" className="text-blue-600">Create Outline</Link>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Assignments</h2>
          <p>Design and assign coursework to students.</p>
          <Link to="" className="text-blue-600">Create Assignment</Link>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Tests</h2>
          <p>Prepare and schedule tests for students.</p>
          <Link to="" className="text-blue-600">Create Test</Link>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Exams</h2>
          <p>Set up exams and evaluate performance.</p>
          <Link to="" className="text-blue-600">Create Exam</Link>
        </div>
      </div>
    </div>
  );
};
