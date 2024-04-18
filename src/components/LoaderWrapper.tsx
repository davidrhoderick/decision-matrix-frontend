import { LinearProgress } from "@mui/joy";
import { FC, ReactNode } from "react";

const LoaderWrapper: FC<{ children: ReactNode; isLoading: boolean }> = ({
  children,
  isLoading,
}) =>
  isLoading ? (
    <LinearProgress
      color={"neutral"}
      size={"sm"}
      value={33}
      variant={"plain"}
      sx={{ width: "100%" }}
    />
  ) : (
    children
  );

export default LoaderWrapper;
