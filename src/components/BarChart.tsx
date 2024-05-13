import { FC } from "react";
import { Stack, Box } from "@mui/joy";

type Props = {
  totals: Array<number | string>;
  max: number;
};

const BarChart: FC<Props> = ({ totals, max }) => (
  <Stack direction={"column-reverse"} width={"2rem"} height={"15rem"}>
    {[...Array(max)].map((_value, index) => {
      const backgroundColor =
        index < Number(totals[0])
          ? "primary.700"
          : index < Number(totals[1])
          ? "primary.200"
          : "background.body";

      return (
        <Box flex={1} height={"1rem"} key={index} sx={{ backgroundColor }} />
      );
    })}
  </Stack>
);

export default BarChart;
