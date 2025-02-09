import { Link } from "react-router-dom";

export default function Public() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">Our School</h1>
        <Link to="/login" className="text-white text-lg underline">
          Login
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our School</h2>
        <p className="text-lg text-gray-600 mb-6">
          Your journey starts here. Click "Login" to access different dashboards.
        </p>
        <Link to="/apply" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
          Apply Now
        </Link>
      </main>
    </div>
  );
}
