import { Link } from "react-router-dom";
import { useStudent } from "../../hooks/useStudent";

const AccountSetting = () => {
  const { studentDetail } = useStudent();
  return (
    <div>
      <div>
        <h3>Account Settings</h3>
        <p>Please fill info about yourself</p>
      </div>
      <form>
        <div>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
          <div>
            <Link>Cancel</Link>
            <button>Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AccountSetting;
