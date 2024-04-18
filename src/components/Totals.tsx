import { FC, useMemo } from "react";

import styled from "@emotion/styled";

import BarChart from "./BarChart";
import { useParams } from "react-router-dom";
import { useGetMatrixByIdQuery } from "@/redux/matrixApi";
import { Alert, Grid, Table } from "@mui/joy";

const Totals: FC = () => {
  const { id } = useParams();
  const { data } = useGetMatrixByIdQuery({ id: id as string });

  const totals = useMemo(
    () =>
      data?.choices.list.map((_choice, index) =>
        data?.factorsChoices.matrix.reduce(
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
    [data?.choices, data?.factorsChoices]
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

  if (!data || !leaders || !totals || !max) {
    return (
      <Alert color="danger">
        Oops! Something went wrong and we were unable to fetch your matrix.
      </Alert>
    );
  }

  const {
    choices: { list: choices },
  } = data;

  return (
    <Grid container alignItems={"center"}>
      <Grid xs={12} md={4}>
        <Table>
          <tbody>
            {choices.map((choice, index) => (
              <tr key={index}>
                <th>
                  {choice} {leaders.includes(index) && `⭐`}
                </th>
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
        <BarCharts>
          {choices.map((choice, index) => (
            <BarChartContainer key={index}>
              {totals.length === choices.length && (
                <BarChart totals={totals[index]} max={max} />
              )}
              <h2>{choice}</h2>
            </BarChartContainer>
          ))}
        </BarCharts>
      </Grid>
    </Grid>
  );
};

export default Totals;

const BarCharts = styled.div`
  margin: 1rem 4rem;
  display: flex;
`;

const BarChartContainer = styled.div`
  position: relative;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 0;
  flex: 1;

  &:nth-of-type(even) {
    h2 {
      margin-top: 2.5rem;
    }
  }

  h2 {
    font-size: 1rem;
    text-align: center;
    white-space: nowrap;
  }
`;
