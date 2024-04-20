import { ChangeEvent, FC, MouseEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addChoice, removeChoice, changeChoice } from "@/redux/choicesSlice";
import { addFactor, removeFactor, changeFactor } from "@/redux/factorsSlice";
import { decrementFactor, incrementFactor } from "@/redux/factorsChoicesSlice";
import { RootState } from "@/redux/store";

import {
  IconButton,
  Input,
  Table as MuiTable,
  Sheet,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { ArrowDown, ArrowRight, Plus, X } from "lucide-react";
import { useMediaQuery } from "@mui/material";
import { usePutMatrixByIdMutation } from "@/redux/matrixApiRaw";

const Table: FC = () => {
  const {
    choices: { list: choices },
    factors: { list: factors },
    factorsChoices: { matrix: factorsChoices },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const [, { isLoading }] = usePutMatrixByIdMutation({
    fixedCacheKey: "update-matrix",
  });

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

  const handleRemoveFactor = (index: number) => dispatch(removeFactor(index));

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Sheet sx={{ overflow: "auto", mx: { xs: -3, md: 0 } }}>
      <MuiTable
        size={mobile ? "sm" : "md"}
        variant="plain"
        sx={{
          "& tr > *:first-child": {
            position: "sticky",
            left: 0,
            zIndex: 1,
          },
          "& td": {
            py: 2,
          },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "180px" }}>
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
              <th key={index} style={{ width: "140px" }}>
                <Input
                  size={"sm"}
                  variant={"plain"}
                  value={choice}
                  onChange={(event) => handleChangeChoice(event, index)}
                  endDecorator={
                    choices.length > 1 && (
                      <IconButton
                        onClick={() => handleRemoveChoice(index)}
                        size={mobile ? "sm" : "md"}
                        disabled={isLoading}
                      >
                        <X />
                      </IconButton>
                    )
                  }
                  disabled={isLoading}
                />
              </th>
            ))}
            <th style={{ width: "140px" }}>
              <Input
                size={"sm"}
                variant={"plain"}
                value={newChoice}
                onChange={(event) => setNewChoice(event.target.value)}
                placeholder="Add choice"
                endDecorator={
                  <IconButton onClick={handleAddChoice} disabled={isLoading}>
                    <Plus />
                  </IconButton>
                }
                disabled={isLoading}
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
                      <IconButton
                        onClick={() => handleRemoveFactor(factorIndex)}
                        disabled={isLoading}
                      >
                        <X />
                      </IconButton>
                    )
                  }
                  disabled={isLoading}
                />
              </th>
              {factorsChoices[factorIndex].map((choiceFactor, choiceIndex) => (
                <td
                  style={{ textAlign: "center", cursor: "pointer" }}
                  key={choiceIndex}
                  onClick={(event) =>
                    !isLoading &&
                    handleFactorChoiceClick(event, factorIndex, choiceIndex)
                  }
                  onContextMenu={(event) =>
                    !isLoading &&
                    handleFactorChoiceClick(event, factorIndex, choiceIndex)
                  }
                >
                  <Typography fontWeight={"bold"} fontSize={"md"}>
                    {choiceFactor < 0 ? "?" : choiceFactor}
                  </Typography>
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
                  <IconButton onClick={handleAddFactor} disabled={isLoading}>
                    <Plus />
                  </IconButton>
                }
                disabled={isLoading}
              />
            </td>
          </tr>
        </tbody>
      </MuiTable>
    </Sheet>
  );
};

export default Table;
