import { useEffect, useState } from "react";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import usePersist from "../hooks/usePersist"
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  console.log('====================================');
  console.log(persist);
  console.log('====================================');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  console.log('login')
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrMsg("Username and Password are required");
      return;
    }
    try {
      const { access: accessToken } = await login({
        email,
        password,
      }).unwrap();
      console.log(accessToken)
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      setPersist(true);

      const { role } = jwtDecode(accessToken);
      console.log(role)
      navigate(`/${role?.toLowerCase()}/dashboard`);
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  const content = (
    <>
    <header>
      <h1>Login</h1>
    </header>
    <main>
      <form onSubmit={onSubmit}>
      <p>{errMsg}</p>
        <label htmlFor="username">Username:
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">Password:
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
    </main>
    <Footer />
    </>
  );

  return content;
};
export default Login;
