import { Stack, Typography } from "@mui/joy";
import { FC, ReactNode } from "react";

const AuthContainer: FC<{ children: ReactNode }> = ({ children }) => (
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
      alignItems={"center"}
    >
      <Typography>Decision Matrix</Typography>

      {children}
    </Stack>
  </Stack>
);

export default AuthContainer;
