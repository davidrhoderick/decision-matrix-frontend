import { FC, useMemo } from "react";

import BarChart from "./BarChart";
import { Grid, Stack, Table, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Totals: FC = () => {
  const {
    choices: { list: choices },
    factorsChoices: { matrix: factorsChoices },
  } = useSelector((state: RootState) => state);

  const totals = useMemo(
    () =>
      choices.map((_choice, index) =>
        factorsChoices.reduce(
          (totals, factor) => {
            const min = totals[0];
            const max = totals[1];

            if (factor[index] < 0) {
              return [min, max + 3];
            } else {
              return [min + factor[index], max + factor[index]];
            }
          },
          [0, 0]
        )
      ),
    [choices, factorsChoices]
  );

  const max = useMemo(
    () =>
      totals?.reduce((max, totals) => (totals[1] > max ? totals[1] : max), 0),
    [totals]
  );

  const leaders = useMemo(
    () => totals?.map((totals, index) => totals[1] === max && index),
    [totals, max]
  );

  return (
    <Grid container alignItems={"center"} mt={3}>
      <Grid xs={12} md={4}>
        <Table sx={{ fontWeight: "bold" }}>
          <tbody>
            {choices.map((choice, index) => (
              <tr key={index}>
                <td>
                  {choice} {leaders.includes(index) && `⭐`}
                </td>
                <td>
                  {totals[index]?.reduce((string, total) => {
                    if (string.length === 0) {
                      return `${total}`;
                    } else if (Number(string) === total) {
                      return string;
                    } else {
                      return `${string}-${total}`;
                    }
                  }, "")}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack direction={"row"} mt={3}>
          {choices.map((choice, index) => (
            <Stack
              key={index}
              mr={2}
              flex={1}
              alignItems={"center"}
              sx={{
                h2: {
                  mt: 2,
                },
                "&:nth-of-type(even) h2": {
                  mt: 5,
                },
              }}
            >
              {totals.length === choices.length && (
                <BarChart totals={totals[index]} max={max} />
              )}
              <Typography level={"h4"} component={"h2"}>
                {choice}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Totals;
