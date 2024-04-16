import { MouseEvent, useEffect, useState } from "react";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";

import { useSelector, useDispatch } from "react-redux";
import { incrementFactor, decrementFactor } from "./factorsChoicesSlice";
import { addChoice, removeChoice, changeChoice } from "./choicesSlice";
import { addFactor, removeFactor, changeFactor } from "./factorsSlice";

import BarChart from "./bar-chart";
import { RootState } from "./store";

const colors = {
  body: "#222",
  grey: "#999",
  bg: "#fff",
};

const App = () => {
  const dispatch = useDispatch();

  const { list: choices } = useSelector((state: RootState) => state.choices);
  const { list: factors } = useSelector((state: RootState) => state.factors);
  const { matrix: factorsChoices } = useSelector(
    (state: RootState) => state.factorsChoices
  );

  const [newChoice, setNewChoice] = useState("");
  const [newFactor, setNewFactor] = useState("");

  const calculateTotals = () =>
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
    );

  const calculateMax = () =>
    totals.reduce((max, totals) => (totals[1] > max ? totals[1] : max), 0);
  const calculateLeaders = () =>
    totals.map((totals, index) => totals[1] === max && index);

  const [totals, setTotals] = useState(calculateTotals());
  const [max, setMax] = useState(calculateMax());
  const [leaders, setLeaders] = useState(calculateLeaders());

  useEffect(() => {
    setTotals(calculateTotals());
  }, [choices, factorsChoices]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMax(calculateMax());
  }, [totals]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLeaders(calculateLeaders());
  }, [totals, max]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFactorChoiceClick = (
    event: MouseEvent<HTMLTableCellElement>,
    factorIndex: number,
    choiceIndex: number
  ) => {
    event.preventDefault();

    if (event.type === "click" || event.button === 0) {
      dispatch(incrementFactor({ factor: factorIndex, choice: choiceIndex }));
    } else if (event.type === "contextmenu" || event.button === 2) {
      dispatch(decrementFactor({ factor: factorIndex, choice: choiceIndex }));
    }
  };

  return (
    <div>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: ${colors.body};
          }

          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
              monospace;
          }
        `}
      />

      <Title>Decision Matrix</Title>

      <div style={{ position: "relative" }}>
        <AxisTitle axis={"x"}>Choices</AxisTitle>
        <AxisTitle axis={"y"}>Factors</AxisTitle>

        <StyledTable>
          <thead>
            <tr>
              <th></th>
              {choices.map((choice, index) => (
                <th key={index}>
                  <StyledInput
                    value={choice}
                    onChange={(event) =>
                      dispatch(
                        changeChoice({ name: event.target.value, index })
                      )
                    }
                  />{" "}
                  {choices.length > 1 && (
                    <Remove onClick={() => dispatch(removeChoice(index))} />
                  )}
                </th>
              ))}
              <th>
                <StyledInput
                  value={newChoice}
                  onChange={(event) => setNewChoice(event.target.value)}
                  placeholder="Add choice"
                />
                <Add
                  onClick={() => {
                    if (newChoice.length > 0) {
                      dispatch(addChoice(newChoice));
                      setNewChoice("");
                    }
                  }}
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {factors.map((factor, factorIndex) => (
              <tr key={factorIndex}>
                <th>
                  <StyledInput
                    value={factor}
                    onChange={(event) =>
                      dispatch(
                        changeFactor({
                          name: event.target.value,
                          index: factorIndex,
                        })
                      )
                    }
                  />{" "}
                  {factors.length > 1 && (
                    <Remove
                      onClick={() => dispatch(removeFactor(factorIndex))}
                    />
                  )}
                </th>
                {factorsChoices[factorIndex].map(
                  (choiceFactor, choiceIndex) => (
                    <td
                      key={choiceIndex}
                      onClick={(event) =>
                        handleFactorChoiceClick(event, factorIndex, choiceIndex)
                      }
                      onContextMenu={(event) =>
                        handleFactorChoiceClick(event, factorIndex, choiceIndex)
                      }
                    >
                      {choiceFactor < 0 ? "?" : choiceFactor}
                    </td>
                  )
                )}
              </tr>
            ))}
            <tr>
              <td>
                <StyledInput
                  value={newFactor}
                  onChange={(event) => setNewFactor(event.target.value)}
                  placeholder="Add factor"
                />
                <Add
                  onClick={() => {
                    if (newFactor.length > 0) {
                      dispatch(addFactor(newFactor));
                      setNewFactor("");
                    }
                  }}
                />
              </td>
            </tr>
          </tbody>
        </StyledTable>
      </div>

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
                  <BarChart colors={colors} totals={totals[index]} max={max} />
                )}
                <h2>{choice}</h2>
              </BarChartContainer>
            ))}
          </BarCharts>
        </Col>
      </Row>
    </div>
  );
};

export default App;

const Title = styled.h1`
  margin: 3rem 2rem 2rem;
`;

const AxisTitle = styled.h2`
  margin: 1rem 2rem;

  ${(props: { axis: "x" | "y" }) =>
    props.axis === "y"
      ? `
    transform: rotate(-90deg) translateX(-50%);
    position: absolute;
    margin: 0;
  `
      : `margin-left: 6rem;`}
`;

const StyledTable = styled.table`
  margin: 1rem 2rem 1rem 4rem;
  border-collapse: collapse;
  display: inline-block;

  th,
  td {
    padding: 1rem;
    text-align: center;
    border: 1px solid #222;
    user-select: none;
    white-space: nowrap;
  }

  td:not(:first-of-type) {
    cursor: pointer;
  }
`;

const Add = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  vertical-align: sub;

  :after {
    content: "\\002B";
    display: inline-block;
  }
`;

const Remove = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  vertical-align: sub;

  :after {
    content: "\\00D7";
    display: inline-block;
  }
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  padding-bottom: 0.375rem;
  border-bottom: 1px solid #222;
  width: 120px;
`;

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
