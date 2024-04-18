import { Container } from "@mui/joy";
import { FC, ReactNode } from "react";

const PageContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <Container sx={{ mt: 3 }}>{children}</Container>
);

export default PageContainer;
