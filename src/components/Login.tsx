import { Link, useNavigate } from "react-router-dom";
import { FC, useCallback, useState } from "react";

import Title from "./Title";
import { useDispatch } from "react-redux";
import { AuthState, setAuth } from "@/redux/authSlice";
import { AuthResponse } from "./Signup";

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = useCallback(() => {
    if (
      !username ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
    ) {
      setUsernameError("Invalid username");
      return;
    }

    if (!password || password.length < 6 || password.length > 255) {
      setPasswordError("Invalid password");
      return;
    }

    setLoading(true);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data: AuthResponse) => {
        dispatch(
          setAuth({
            tokenType: data.tokenType,
            accessToken: data.session.id,
          })
        );
        console.log("redirecting...");
        navigate("/");
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [username, password, dispatch, navigate]);

  return (
    <div>
      <Title>Login</Title>

      <input
        placeholder="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      {usernameError && <span>{usernameError}</span>}

      <input
        placeholder="password"
        value={password}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />

      {passwordError && <span>{passwordError}</span>}

      <button onClick={submit} disabled={loading}>
        Submit
      </button>

      <Link to="/signup">Sign up</Link>
    </div>
  );
};

export default Login;
