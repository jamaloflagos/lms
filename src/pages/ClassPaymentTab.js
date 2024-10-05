import { useCustomQuery } from "../hooks/useCustomQuery";

const ClassPaymentTab = ({ classId, type }) => {
    const { data: std_payments, isLoading, isError } = useCustomQuery(['std_payments'], `http://127.0.0.1:8000/std_payment/${classId}/${type}`);

    if (isLoading) return <div>Loading payments...</div>;
    if (isError) return <div>Error fetching payments...</div>;

    return (
        <div>
            <h1>{type}</h1>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Balance</th>
                        <th>Paid</th>
                        <th>Individual Amount Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {std_payments && std_payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.student_name}</td>
                            <td>{payment.balance}</td>
                            <td>{payment.paid}</td>
                            <td>
                                {/* If history exists, create sub-rows, else display 'nil' */}
                                {payment.history.length > 0 ? (
                                    <table>
                                        <tbody>
                                            {payment.history.map((entry, index) => (
                                                <tr key={index}>
                                                    <td>{entry.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    "nil"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClassPaymentTab;
