import { useParams } from "react-router-dom";
import { useCustomQuery } from "../hooks/useCustomQuery";
import ClassPaymentTab from "./ClassPaymentTab";
import { useState } from "react";

const ClassPayment = () => {
    const { classId } = useParams();
    const { data: classPayments, isLoading, isError } = useCustomQuery(['classes'], `http://127.0.0.1:8000/payment/${classId}`);
    const [type, setType] = useState(classPayments[0].type)

    if (isLoading) return <div>Loading data...</div>;
    if (isError) return <div>Error fetching data</div>;

  return (
    <div>
        <div>
            {
                classPayments.map(payment => (
                    <button onClick={setType(payment.type)}>{payment.type}</button>
                ))
            }
        </div>
        <ClassPaymentTab classId={classId} type={type}/>
    </div>
  )
}
export default ClassPayment