import { Link, useNavigate } from "react-router-dom";
import { FC, useState } from "react";

import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "@/redux/store";

import { signup } from "@/redux/authSlice";

import AuthContainer from "../components/AuthContainer";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";

const usernameMessage = "Please enter a valid username" as const;
const passwordMessage = "Please enter a valid password" as const;
const confirmPasswordMessage = "Password values must match" as const;

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Signup: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");

  const { control, handleSubmit, watch } = useForm<FormData>();

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

  return (
    <AuthContainer>
      <Typography level={"h1"}>Signup</Typography>

      <Controller
        control={control}
        name={"username"}
        rules={{
          minLength: { value: 3, message: usernameMessage },
          maxLength: { value: 31, message: usernameMessage },
          pattern: {
            value: /^[a-z0-9_-]+$/,
            message: usernameMessage,
          },
          required: { value: true, message: usernameMessage },
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl error={!!error?.message}>
            <FormLabel>Username</FormLabel>
            <Input {...field} />
            {error && (
              <FormHelperText color={"danger"}>{error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name={"password"}
        rules={{
          minLength: { value: 6, message: passwordMessage },
          maxLength: { value: 255, message: passwordMessage },
          required: { value: true, message: passwordMessage },
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl error={!!error?.message}>
            <FormLabel>Password</FormLabel>
            <Input {...field} type={"password"} />
            {error && (
              <FormHelperText color={"danger"}>{error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name={"confirmPassword"}
        rules={{
          validate: (value, { password }) =>
            value === password || confirmPasswordMessage,
          required: { value: true, message: confirmPasswordMessage },
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl error={!!error?.message}>
            <FormLabel>Password</FormLabel>
            <Input {...field} type={"password"} />
            {error && (
              <FormHelperText color={"danger"}>{error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      {signupError && <Alert color={"danger"}>{signupError}</Alert>}

      <Button onClick={onSubmit} disabled={loading}>
        Submit
      </Button>

      <Button variant={"plain"} component={Link} to="/login">
        Log in
      </Button>
    </AuthContainer>
  );
};

export default Signup;