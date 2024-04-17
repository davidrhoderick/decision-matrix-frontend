import { Link, useNavigate } from "react-router-dom";
import { FC, useState } from "react";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "@/redux/store";

import { login } from "@/redux/authSlice";

import Title from "./Title";

type FormData = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);

  watch(() => {
    setLoginError("");
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    dispatch(login(data))
      .then(unwrapResult)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setLoginError(error);
        console.error(error);
      });
  });

  const usernameMessage = "Please enter a valid username" as const;
  const passwordMessage = "Please enter a valid password" as const;

  return (
    <div>
      <Title>Login</Title>

      <input
        placeholder="username"
        {...register("username", {
          minLength: { value: 3, message: usernameMessage },
          maxLength: { value: 31, message: usernameMessage },
          pattern: {
            value: /^[a-z0-9_-]+$/,
            message: usernameMessage,
          },
          required: { value: true, message: usernameMessage },
        })}
      />

      <ErrorMessage errors={errors} name="username" />

      <input
        placeholder="password"
        type="password"
        {...register("password", {
          minLength: { value: 6, message: passwordMessage },
          maxLength: { value: 255, message: passwordMessage },
          required: { value: true, message: passwordMessage },
        })}
      />

      <ErrorMessage errors={errors} name="password" />

      <button onClick={onSubmit} disabled={loading}>
        Submit
      </button>

      {loginError && <div>{loginError}</div>}

      <Link to="/signup">Sign up</Link>
    </div>
  );
};

export default Login;
