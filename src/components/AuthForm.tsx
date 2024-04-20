import { Stack, Typography, Grid, Alert } from "@mui/joy";
import { FC, FormEventHandler, ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  onSubmit: FormEventHandler;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  error?: string;
};

const AuthForm: FC<Props> = ({
  children,
  title,
  onSubmit,
  leftAction,
  rightAction,
  error,
}) => (
  <Stack
    alignItems={"center"}
    justifyContent={"center"}
    sx={(theme) => ({
      background: theme.vars.palette.background.backdrop,
      height: `100vh`,
    })}
  >
    <Stack
      spacing={2}
      sx={(theme) => ({
        background: theme.vars.palette.background.body,
        padding: 3,
        borderRadius: theme.vars.radius.lg,
      })}
      component={"form"}
      onSubmit={onSubmit}
      width={"300px"}
    >
      <Typography>Decision Matrix</Typography>

      <Typography level={"h1"}>{title}</Typography>

      {children}

      {error && <Alert color={"danger"}>{error}</Alert>}

      <Grid container px={1}>
        <Grid xs={6} mr={1} ml={-1}>
          {leftAction}
        </Grid>

        <Grid xs={6} ml={1} mr={-1}>
          {rightAction}
        </Grid>
      </Grid>
    </Stack>
  </Stack>
);

export default AuthForm;
