import { Link } from "react-router-dom";
import { useStudent } from "../../hooks/useStudent";

const AccountSetting = () => {
  const { studentDetail } = useStudent();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Account Settings</h3>
      <p className="text-gray-500 mb-6">Please fill info about yourself</p>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="current-password" className="text-gray-700">Current Password</label>
          <input type="password" id="current-password" className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="new-password" className="text-gray-700">New Password</label>
          <input type="password" id="new-password" className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirm-password" className="text-gray-700">Confirm Password</label>
          <input type="password" id="confirm-password" className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex justify-end">
          <Link to="/" className="text-blue-500 hover:underline mr-4">Cancel</Link>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSetting;