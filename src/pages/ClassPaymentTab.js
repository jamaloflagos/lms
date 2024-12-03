import { useState } from "react";
import { useCustomQuery } from "../hooks/useCustomQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ClassPaymentTab = ({ classId, type }) => {
  console.log(type);
  const {
    data: std_payments,
    isLoading,
    isError,
  } = useCustomQuery(
    ["std_payments", classId, type],
    `https://lms-api-xi.vercel.app/std_payment/${classId}/${type}`
  );
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (paymentData) => {
      const response = await fetch(
        `https://lms-api-xi.vercel.app/std-payment/${paymentId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Applicant email already exist");
        }
        throw new Error("Network response was not ok");
      }
      setMessage("You have suceesfully updated this payment");
      return response.json();
    },
    onError: (error) => {
      setMessage(error.message);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["messages"]);
    },
  });

  const handlePaymentUpdate = (e) => {
    e.preventDefault();
    console.log(paymentId);
    if (paymentId) {
      mutation.mutate({ amount });
    }
  };

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
          {std_payments &&
            std_payments.map((payment) => (
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
                          // <tr key={index}>
                          <td>{entry.amount}</td>
                          // </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    "nil"
                  )}
                </td>
                <button
                  onClick={() => {
                    setShowUpdateForm(true);
                    setPaymentId(payment.id);
                  }}
                >
                  Update
                </button>
              </tr>
            ))}
        </tbody>
      </table>
      {showUpdateForm && (
        <div className="overlay">
          <label htmlFor="amount">
            Amount:
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          {message && <p>{message}</p>}
          <button onClick={handlePaymentUpdate}>Save</button>
          <button onClick={() => setShowUpdateForm(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ClassPaymentTab;
