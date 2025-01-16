import { PaystackButton } from "react-paystack";
import { useEffect, useState } from "react";
import {
  useVerifyPaymentMutation,
  useVerifyEmailMutation,
} from "./paymentsApiSlice";
const MakePayment = () => {
  const [verifyPayment, { data, isSuccess: verifyPaymentIsSuccess, isError: verifyPaymentIsError, error: verifyPaymentError }] = useVerifyPaymentMutation();
  const [verifyEmail, { isSuccess: verifyEmailIsSuccess, isError: verifyEmailIsError, error: verifyEmailError }] = useVerifyEmailMutation();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [error, setError] = useState("");
  const publickey = "pk_test_ea0fa27f4806bb79ecdbf9f92f82bfa8d47f9bf0";

  const verifyEmailAddress = async (e) => {
    if (email){
      await verifyEmail(email);
    } else {
      setError("Please enter an email")
    }
  };

  const onSuccess = async (reference) => {
    await verifyPayment({ reference: reference.reference, email });
  };
  const onClose = () => {};

  const componentProps = {
    email,
    amount: amount * 100,
    publickey,
    test: "Pay Now",
    onSuccess,
    onClose,
  };

  useEffect(() => {
    if (verifyEmailIsSuccess) {
      setIsEmailVerified(true)
      alert("Email verified successfully! You can now proceed with payment.");
    }
  }, [verifyEmailIsSuccess])

  useEffect(() => {
    if (verifyPaymentIsSuccess) {
      alert(data?.message)
      setEmail("")
      setAmount("")
    }
  }, [verifyPaymentIsSuccess, data])

  return (
    <>
      <header>
        <h1>Make Payment</h1>
      </header>
      <main>
        <article>
          <form>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button onClick={verifyEmailAddress} disabled={isEmailVerified || !email}>
              Verify Email
            </button>
            {(verifyEmailIsError || error) && <p style={{ color: "red" }}>{(verifyEmailError?.data?.message || error)}</p>}
            <label htmlFor="amount">
              Amount:
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </form>
          {verifyPaymentIsError && <p>{verifyPaymentError?.data?.message}</p>}
          <PaystackButton {...componentProps} disabled={!isEmailVerified} />
        </article>
      </main>
    </>
  );
};
export default MakePayment;
