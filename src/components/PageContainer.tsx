import { Box, Container } from "@mui/joy";
import { FC, ReactNode } from "react";

const PageContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={(theme) => ({
      background: theme.palette.background.backdrop,
      minHeight: "100vh",
      py: 3,
      px: { xs: 0, md: 3 },
    })}
  >
    <Container
      sx={(theme) => ({
        p: 3,
        background: theme.palette.background.body,
        borderRadius: theme.radius.lg,
      })}
    >
      {children}
    </Container>
  </Box>
);

export default PageContainer;
