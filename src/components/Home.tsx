import Title from "./Title";

import { Link } from "react-router-dom";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signout } from "@/redux/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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

  const handleSignout = useCallback(() => {
    dispatch(signout())
      .then(unwrapResult)
      .catch((error: unknown) => console.error(error));
  }, [dispatch]);

  return (
    <div>
      <Title>{data}</Title>
      {data !== "loading" &&
        (data === "logged in" ? (
          <button onClick={handleSignout}>Sign out</button>
        ) : (
          <Link to="/login">Login</Link>
        ))}
    </div>
  );
};

export default Home;
