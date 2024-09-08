import { useStudent } from "../../hooks/useStudent";

const Reports = () => {
  const { studentDetail } = useStudent();
  return (
    <div>
      <h3>Results & reports</h3>
      <p></p>
      <div>
        <h4>Progress report</h4>
        <div>
          <h5>Assignment</h5>
        </div>
        <div>
          <h5>Unit Test</h5>
        </div>
        <div>
          <h5>Mid-term Exam</h5>
        </div>
        <div>
          <h5>Final Exam</h5>
        </div>
      </div>
      <button>Download Report</button>
    </div>
  );
};
export default Reports;
