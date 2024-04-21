import { Link, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/redux/store";

import { login } from "@/redux/authSlice";

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@mui/joy";
import AuthForm from "../components/AuthForm";

type FormData = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const { tokenType, accessToken, username } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (
      tokenType.length &&
      accessToken.length &&
      username.length
    ) {
      navigate("/");
    }
  }, [accessToken, tokenType, navigate, username]);

  const { control, handleSubmit, watch } = useForm<FormData>();

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
        setLoginError(error.message);
        console.error(error);
      });
  });

  const usernameMessage = "Please enter a valid username" as const;
  const passwordMessage = "Please enter a valid password" as const;

  return (
    <AuthForm
      title={"Login"}
      onSubmit={onSubmit}
      leftAction={
        <Button type={"submit"} disabled={loading} fullWidth>
          Submit
        </Button>
      }
      rightAction={
        <Button variant={"plain"} component={Link} to="/signup" fullWidth>
          Sign up
        </Button>
      }
      error={loginError}>
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
    </AuthForm>
  );
};

export default Login;
