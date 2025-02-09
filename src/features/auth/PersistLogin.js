import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import Spinner from "../../components/Spinner";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

  }, []);


  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = (
      <div className="flex flex-col items-center justify-center max-w-md mx-auto mt-10 p-4 bg-red-100 text-red-700 border border-red-400 rounded-lg shadow-md">
        <p className="mb-2 text-center font-medium">
          {error?.data?.message || "An unexpected error occurred."}
        </p>
        <Link to="/login" className="text-red-900 font-semibold underline">
          Please login again.
        </Link>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
