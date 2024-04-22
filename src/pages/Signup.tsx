import { Link, useNavigate } from "react-router-dom";
import { FC, useState } from "react";

import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "@/redux/store";

import { signup } from "@/redux/authSlice";

import AuthForm from "../components/AuthForm";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@mui/joy";

const usernameMessage = "Please enter a valid username" as const;
const emailMessage = "Please enter a valid email" as const;
const passwordMessage = "Please enter a valid password" as const;
const confirmPasswordMessage = "Password values must match" as const;

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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
          navigate("/confirm-email");
        })
        .catch((error) => {
          setLoading(false);
          setSignupError(error.message);
          console.error(error);
        });
    }
  );

  return (
    <AuthForm
      title={"Signup"}
      onSubmit={onSubmit}
      leftAction={
        <Button type={"submit"} disabled={loading} fullWidth>
          Sign up
        </Button>
      }
      rightAction={
        <Button variant={"plain"} component={Link} to="/login" fullWidth>
          Log in
        </Button>
      }
      error={signupError}
    >
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
        name={"email"}
        rules={{
          pattern: {
            value:
              /^[a-z0-9~!$%^&*_=+\-}{'?]+(\.[a-z0-9~!$%^&*_=+\-}{'?]+)*@([a-z0-9_][a-z0-9_]*(\.[a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,
            flags: "i",
            message: emailMessage,
          },
          required: { value: true, message: emailMessage },
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl error={!!error?.message}>
            <FormLabel>Email</FormLabel>
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
            <FormLabel>Confirm password</FormLabel>
            <Input {...field} type={"password"} />
            {error && (
              <FormHelperText color={"danger"}>{error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </AuthForm>
  );
};

export default Signup;
