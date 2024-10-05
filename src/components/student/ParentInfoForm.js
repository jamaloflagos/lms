import { Link } from "react-router-dom";
import { useStudent } from "../../hooks/useStudent";

const ParentInfoForm = () => {
  const { studentDetail } = useStudent();
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Parents Information</h3>
        <p className="text-gray-500">Please fill details about yourself</p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="relationship" className="text-sm font-medium text-gray-700 mb-1">
              Relationship with Student
            </label>
            <select
              id="relationship"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="occupation" className="text-sm font-medium text-gray-700 mb-1">
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter occupation"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <textarea
              id="address"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
              rows="3"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Link
            to="/"
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParentInfoForm;
