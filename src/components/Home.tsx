import Title from "./Title";

import { Link, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";

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

export default Home;