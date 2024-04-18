import { FC, MouseEvent, useState } from "react";

import styled from "@emotion/styled";
import { useDispatch } from "react-redux";

import { addChoice, removeChoice, changeChoice } from "@/redux/choicesSlice";
import { addFactor, removeFactor, changeFactor } from "@/redux/factorsSlice";
import { decrementFactor, incrementFactor } from "@/redux/factorsChoicesSlice";

import StyledTable from "./StyledTable";
import { Matrix } from "@/redux/matrixApi";

type Props = {
  decisionMatrix: Matrix;
};

const Table: FC<Props> = ({
  decisionMatrix: {
    choices: { list: choices },
    factors: { list: factors },
    factorsChoices: { matrix: factorsChoices },
  },
}) => {
  const dispatch = useDispatch();

  const [newChoice, setNewChoice] = useState("");
  const [newFactor, setNewFactor] = useState("");

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
                    dispatch(changeChoice({ name: event.target.value, index }))
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
                  <Remove onClick={() => dispatch(removeFactor(factorIndex))} />
                )}
              </th>
              {factorsChoices[factorIndex].map((choiceFactor, choiceIndex) => (
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
              ))}
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
  );
};

export default Table;

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
