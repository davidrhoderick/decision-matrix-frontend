import { Stack, Typography } from "@mui/joy";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

const AuthContainer: FC<Props> = ({ children, title }) => (
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
      width={"300px"}
    >
      <Typography>Decision Matrix</Typography>

      <Typography level={"h1"}>{title}</Typography>

      {children}
    </Stack>
  </Stack>
);

export default AuthContainer;
