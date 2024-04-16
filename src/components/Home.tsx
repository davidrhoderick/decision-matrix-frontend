import Title from "./Title";

import { Link, useNavigate } from "react-router-dom";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearAuth } from "@/redux/authSlice";

const Home: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState("loading");

  const { tokenType, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/`, {
      credentials: "include",
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.status));
  }, [accessToken, tokenType]);

  const signout = useCallback(
    () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/signout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      }).then(() => dispatch(clearAuth())),
    [accessToken, navigate, tokenType]
  );

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
