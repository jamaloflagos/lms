import { Link } from "react-router-dom";
import { useStudent } from "../../hooks/useStudent";

const StudentInfoForm = () => {
  const { studentDetail } = useStudent();
  return (
    <div>
      <div>
        <h3>My Details</h3>
        <p>
          Please fill details about yourself and ensure to input your correct
          name as you want it on your certificate
        </p>
      </div>
      <form>
        <div>
          <div>
            <label htmlFor="">First Name</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Last name</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Gender</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Date of Birth</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Class</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Phone Number</label>
          </div>
          <div>
            <label htmlFor="">Street Address</label>
            <textarea name="" id=""></textarea>
          </div>
        </div>
        <div>
          <Link>Cancel</Link>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};
export default StudentInfoForm;
