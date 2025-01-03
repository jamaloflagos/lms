import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../hooks/useStudent";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useParams();
  // const { login, setAuthToken, setUserId } = useAuth();
  const { setStudentId, setStudentDetail } = useStudent();

  const mutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await fetch("https://lms-api-xi.vercel.app/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`You are not a registered ${user}`);
        }

        if (response.status === 500) {
          throw new Error("Internal Server Error");
        }

        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (user === "student") {
        setStudentId(data.id);
        setStudentDetail(data);
        localStorage.setItem("studentId", data.id);
        localStorage.setItem("studentDetail", JSON.stringify(data));
        navigate(`/${user}`);
        return;
      }
    },
    onError: (error) => {
      setMessage(error.message);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return setMessage("All input field required");
    }
    mutation.mutate({ email: username, password, role: user });
  };

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>
        {message && <h1>{message}</h1>}
        <button type="submit">Login</button>
      </form>
      <Link to="/">Go back home</Link>
    </main>
  );
};

export default Login;
