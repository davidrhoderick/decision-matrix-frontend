import { FC, useEffect, useState } from "react";

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resendConfirmationEmail } from "@/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Controller, useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import AuthForm from "@/components/AuthForm";

type FormData = {
  username: string;
  password: string;
};

const EmailConfirmationExpired: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const { tokenType, accessToken, username, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (error === "Email not verified") {
      navigate("/confirm-email");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (tokenType.length && accessToken.length && username.length) {
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
    dispatch(resendConfirmationEmail(data))
      .then(unwrapResult)
      .then(() => {
        setLoading(false);
        navigate("/confirm-email");
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
      title={"Email confirmation expired"}
      onSubmit={onSubmit}
      leftAction={
        <Button type={"submit"} disabled={loading} fullWidth>
          Resend confirmation email
        </Button>
      }
      error={loginError}
    >
      <Typography>
        Unfortunately, your email confirmation link expired. Please log in and
        click the button for resending the confirmation email.
      </Typography>

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

export default EmailConfirmationExpired;
