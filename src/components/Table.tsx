import { ChangeEvent, FC, MouseEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addChoice, removeChoice, changeChoice } from "@/redux/choicesSlice";
import { addFactor, removeFactor, changeFactor } from "@/redux/factorsSlice";
import { decrementFactor, incrementFactor } from "@/redux/factorsChoicesSlice";
import { RootState } from "@/redux/store";

import { IconButton, Input, Table as MuiTable, Stack } from "@mui/joy";
import { ArrowDown, ArrowRight, Plus, X } from "lucide-react";

const Table: FC = () => {
  const {
    choices: { list: choices },
    factors: { list: factors },
    factorsChoices: { matrix: factorsChoices },
  } = useSelector((state: RootState) => state);

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

  const handleAddChoice = () => {
    if (newChoice.length > 0) {
      dispatch(addChoice(newChoice));
      setNewChoice("");
    }
  };

  const handleChangeChoice = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => dispatch(changeChoice({ name: event.target.value, index }));

  const handleRemoveChoice = (index: number) => dispatch(removeChoice(index));

  const handleAddFactor = () => {
    if (newFactor.length > 0) {
      dispatch(addFactor(newFactor));
      setNewFactor("");
    }
  };

  const handleChangeFactor = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) =>
    dispatch(
      changeFactor({
        name: event.target.value,
        index,
      })
    );

  const handleRemoveFactor = (index: number) => () =>
    dispatch(removeFactor(index));

  return (
    <MuiTable>
      <thead>
        <tr>
          <th>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack alignItems={"center"}>
                Factors <ArrowDown />
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                Choices <ArrowRight />
              </Stack>
            </Stack>
          </th>
          {choices.map((choice, index) => (
            <th key={index}>
              <Input
                size={"sm"}
                variant={"plain"}
                value={choice}
                onChange={(event) => handleChangeChoice(event, index)}
                endDecorator={
                  choices.length > 1 && (
                    <IconButton onClick={() => handleRemoveChoice(index)}>
                      <X />
                    </IconButton>
                  )
                }
              />
            </th>
          ))}
          <th>
            <Input
              size={"sm"}
              variant={"plain"}
              value={newChoice}
              onChange={(event) => setNewChoice(event.target.value)}
              placeholder="Add choice"
              endDecorator={
                <IconButton onClick={handleAddChoice}>
                  <Plus />
                </IconButton>
              }
            />
          </th>
        </tr>
      </thead>

      <tbody>
        {factors.map((factor, factorIndex) => (
          <tr key={factorIndex}>
            <th>
              <Input
                size={"sm"}
                variant={"plain"}
                value={factor}
                onChange={(event) => handleChangeFactor(event, factorIndex)}
                endDecorator={
                  factors.length > 1 && (
                    <IconButton onClick={() => handleRemoveFactor(factorIndex)}>
                      <X />
                    </IconButton>
                  )
                }
              />
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
            <Input
              size={"sm"}
              variant={"plain"}
              value={newFactor}
              onChange={(event) => setNewFactor(event.target.value)}
              placeholder="Add factor"
              endDecorator={
                <IconButton onClick={handleAddFactor}>
                  <Plus />
                </IconButton>
              }
            />
          </td>
        </tr>
      </tbody>
    </MuiTable>
  );
};

export default Table;
