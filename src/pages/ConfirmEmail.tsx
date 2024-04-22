import { FC } from "react";

import { Typography } from "@mui/joy";
import AuthContainer from "@/components/AuthContainer";

const ConfirmEmail: FC = () => (
  <AuthContainer title={"Confirm your email address"}>
    <Typography>
      Head over to the inbox of the email you signed up with and click on the
      link we sent you to confirm your email address.
    </Typography>
  </AuthContainer>
);

export default ConfirmEmail;
