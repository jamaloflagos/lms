import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const Dashboard = () => {

  const data = [
    { subject: "Math", Assignment: 85, Test: 78, Exam: 90 },
    { subject: "English", Assignment: 75, Test: 80, Exam: 85 },
    { subject: "Science", Assignment: 88, Test: 76, Exam: 89 },
    { subject: "History", Assignment: 82, Test: 74, Exam: 81 },
    { subject: "Geography", Assignment: 79, Test: 82, Exam: 87 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Overview</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Assignment" fill="#1E3A8A" />
            <Bar dataKey="Test" fill="#FFD700" />
            <Bar dataKey="Exam" fill="#FF5733" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
