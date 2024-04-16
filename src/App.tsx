import { css, Global } from "@emotion/react";

import styled from "@emotion/styled";

import Table from "@/components/Table";
import Totals from "@/components/Totals";
import colors from "@/lib/colors";
import store from "@/redux/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { FC, useCallback, useEffect, useState } from "react";

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

const Signup: FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (
      !password ||
      password.length < 6 ||
      password.length > 255 ||
      password !== confirmPassword
    ) {
      setPasswordError("Invalid password");
      return;
    }

    setLoading(true);

    fetch("http://localhost:3000/signup", {
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
  }, [username, password, confirmPassword, navigate]);

  return (
    <div>
      <Title>Sign up</Title>

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

      <input
        placeholder="confirm password"
        value={confirmPassword}
        type="password"
        onChange={(event) => setConfirmPassword(event.target.value)}
      />

      {passwordError && <span>{passwordError}</span>}

      <button onClick={submit} disabled={loading}>
        Submit
      </button>

      <Link to="/login">Login</Link>
    </div>
  );
};

const Home: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("loading");
  useEffect(() => {
    fetch("http://localhost:3000", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setData(data.status));
  }, []);

  const signout = () =>
    fetch("http://localhost:3000/signout", {
      method: "POST",
      credentials: "include",
    }).then(() => navigate("/login"));

  return (
    <div>
      <Title>{data}</Title>
      {data !== "loading" &&
        (data === "logged in" ? (
          <button onClick={signout}>Sign out</button>
        ) : (
          <Link to="/login">Login</Link>
        ))}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const App = () => (
  <Provider store={store}>
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: ${colors.body};
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }
      `}
    />

    <RouterProvider router={router} />

    {/* <Title>Decision Matrix</Title>

    <Table />

    <Totals /> */}
  </Provider>
);

export default App;

const Title = styled.h1`
  margin: 3rem 2rem 2rem;
`;
