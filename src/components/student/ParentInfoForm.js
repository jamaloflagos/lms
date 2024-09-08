import { Link } from "react-router-dom";
import { useStudent } from "../../hooks/useStudent";
const ParentInfoForm = () => {
  const { studentDetail } = useStudent();
  return (
    <div>
      <div>
        <h3>My Details</h3>
        <p>Please fill details about your parent</p>
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
            <label htmlFor="">Relationship with student</label>
            <select name="" id="">
              <option value="">Select</option>
              <option value="">Father</option>
              <option value="">Mother</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Occupation</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Email Address</label>
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
export default ParentInfoForm;
