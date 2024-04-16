import { Link, useNavigate } from "react-router-dom";
import { FC, useCallback, useState } from "react";

import Title from "./Title";

const Login: FC = () => {
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

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then(() => {
        console.log("redirecting...");
        navigate("/");
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [username, password, navigate]);

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