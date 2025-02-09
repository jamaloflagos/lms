import { useEffect, useState } from "react";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import usePersist from "../hooks/usePersist";
import Spinner from "../components/Spinner";

const VisitorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (e, user) => {
    e.preventDefault();


    try {
        let accessToken;
        if (user === 'admin') {
            const { access, refresh } = await login({ email: 'admin@gmail.com', password: 'oyinkan1' }).unwrap();
            console.log(refresh);
            accessToken = access
        } else if (user === 'teacher') {
            const { access } = await login({ email: 'kaothar@gmail.com', password: 'YJBo4u3JlfQuvnr' }).unwrap();
            accessToken = access
        } else {
            const { access } = await login({ email: 'taiwo@gmail.com', password: 'CcmMxuS38YyfeY3' }).unwrap();
            accessToken = access

        }
      dispatch(setCredentials({ accessToken }));
      setPersist(true);

      const { role } = jwtDecode(accessToken);
      navigate(`/${role?.toLowerCase()}/dashboard`);
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message || "Login Failed");
      }
    }
  };

  if (isLoading) return <Spinner />

  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
  <header className="mb-6">
    <h1 className="text-3xl font-bold text-blue-600">Welcome</h1>
  </header>
  <main className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
    <h1 className="text-xl font-semibold text-gray-800 mb-4">Login as:</h1>
    <ul className="space-y-3">
      <li
        className="cursor-pointer bg-blue-500 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        onClick={(e) => onSubmit(e, 'admin')}
      >
        Admin
      </li>
      <li
        className="cursor-pointer bg-green text-white text-center py-2 px-4 rounded-lg hover:bg-green-600 transition"
        onClick={(e) => onSubmit(e, 'teacher')}
      >
        Teacher
      </li>
      <li
        className="cursor-pointer bg-purple-500 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-600 transition"
        onClick={(e) => onSubmit(e, 'student')}
      >
        Student
      </li>
    </ul>
    {errMsg && (
      <p className="text-red-600 bg-red-100 p-2 rounded text-sm mt-4">
        {errMsg}
      </p>
    )}
  </main>
</div>

  );
};

export default VisitorLogin;
