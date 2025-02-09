import { useEffect, useState } from "react";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import usePersist from "../hooks/usePersist";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrMsg("Email and Password are required");
      return;
    }

    try {
      const { access: accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
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

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Login</h1>
      </header>
      <main className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <form onSubmit={onSubmit} className="space-y-4">
          {errMsg && (
            <p className="text-red-600 bg-red-100 p-2 rounded text-sm">
              {errMsg}
            </p>
          )}
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-sm font-medium">
              Email:
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="persist"
              checked={persist}
              onChange={() => setPersist((prev) => !prev)}
              className="form-checkbox text-blue-500"
            />
            <label htmlFor="persist" className="text-sm">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
