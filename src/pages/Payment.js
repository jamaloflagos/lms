import { useState } from "react";
import { useCustomQuery } from "../hooks/useCustomQuery";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Payment = () => {
  const {
    data: classes,
    isLoading,
    isError,
  } = useCustomQuery(["classes"], "https://lms-api-xi.vercel.app/class");
  const [createPayment, setCreatePayment] = useState(false);
  const [type, setType] = useState("");
  const [inputClasses, setInputClasses] = useState([]);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (paymentData) => {
      const response = await fetch("https://lms-api-xi.vercel.app/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Applicant email already exist");
        }
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    onError: (error) => {
      setMessage(error.message);
    },
  });

  const handleCreatePayment = (e) => {
    e.preventDefault();
    console.log({ type, amount, inputClasses });
    mutation.mutate({ type, amount, classes: inputClasses });
  };

  const handleClassChange = (e) => {
    const classId = parseInt(e.target.value);
    if (e.target.checked) {
      setInputClasses((prev) => [...prev, classId]);
    } else {
      setInputClasses((prev) => prev.filter((id) => id !== classId));
    }
  };

  if (isLoading) return <div>Loading data</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <div>
        <h1>Payments</h1>
        <button onClick={() => setCreatePayment((prev) => !prev)}>
          Create new payment
        </button>
      </div>

      <div>
        <ul>
          {classes &&
            classes.map((_class) => (
              <Link key={_class.id} to={`${_class.id}`}>
                <li>{_class.name}</li>
              </Link>
            ))}
        </ul>
      </div>

      {createPayment && (
        <form onSubmit={handleCreatePayment}>
          <label htmlFor="type">
            Payment type:
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>

          <label htmlFor="amount">
            Amount:
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>

          <div>
            <label>Class:</label>
            {classes.map((_class) => (
              <div key={_class.id}>
                <input
                  type="checkbox"
                  value={_class.id}
                  onChange={handleClassChange}
                />
                <label>{_class.name}</label>
              </div>
            ))}
          </div>
          {message && <p>{message}</p>}
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  );
};

export default Payment;
