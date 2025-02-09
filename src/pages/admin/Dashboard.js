import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Manage Terms</h2>
          <Link 
            to="/admin/terms/new" 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Term
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Manage Classes</h2>
          <Link 
            to="/admin/classes" 
            className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            View Classes
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Manage Teachers</h2>
          <Link 
            to="/admin/teachers" 
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            View Teachers
          </Link>
        </div>
      </div>
    </div>
  );
};
