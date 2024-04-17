import { Link, useNavigate } from "react-router-dom";
import { FC, useState } from "react";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "@/redux/store";

import { signup } from "@/redux/authSlice";

import Title from "./Title";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Signup: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);

  watch(() => {
    setSignupError("");
  });

  const onSubmit = handleSubmit(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ confirmPassword, ...data }) => {
      setLoading(true);
      dispatch(signup(data))
        .then(unwrapResult)
        .then(() => {
          setLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          setSignupError(error.message ?? error);
          console.error(error);
        });
    }
  );

  const usernameMessage = "Please enter a valid username" as const;
  const passwordMessage = "Please enter a valid password" as const;

  return (
    <div>
      <Title>Signup</Title>

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

      <input
        placeholder="confirm password"
        type="password"
        {...register("confirmPassword", {
          validate: (value, { password }) =>
            value === password || "Password values must match",
        })}
      />

      <ErrorMessage errors={errors} name="confirmPassword" />

      <button onClick={onSubmit} disabled={loading}>
        Submit
      </button>

      {signupError && <div>{signupError}</div>}

      <Link to="/login">Login</Link>
    </div>
  );
};

export default Signup;
