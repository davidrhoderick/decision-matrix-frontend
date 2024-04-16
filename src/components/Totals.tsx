import { FC, useMemo } from "react";
import StyledTable from "./StyledTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styled from "@emotion/styled";
import BarChart from "./BarChart";

const Totals: FC = () => {
  const { list: choices } = useSelector((state: RootState) => state.choices);
  const { matrix: factorsChoices } = useSelector(
    (state: RootState) => state.factorsChoices
  );

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
      totals.reduce((max, totals) => (totals[1] > max ? totals[1] : max), 0),
    [totals]
  );

  const leaders = useMemo(
    () => totals.map((totals, index) => totals[1] === max && index),
    [totals, max]
  );

  return (
    <Row>
      <Col>
        <StyledTable>
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
        </StyledTable>
      </Col>

      <Col>
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
      </Col>
    </Row>
  );
};

export default Totals;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Col = styled.div`
  width: 33%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

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
