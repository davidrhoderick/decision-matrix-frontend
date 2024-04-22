import LoaderWrapper from "@/components/LoaderWrapper";
import PageContainer from "@/components/PageContainer";
import Table from "@/components/Table";
import Totals from "@/components/Totals";
import {
  useGetMatrixByIdQuery,
  usePutMatrixByIdMutation,
} from "@/redux/matrixApi";
import { RootState } from "@/redux/store";
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Button, Input, List, ListItem, Stack, Typography, useTheme } from "@mui/joy";
import { ChevronLeft, Save } from "lucide-react";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import ModeToggle from "@/components/ModeToggle";

const Matrix = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useGetMatrixByIdQuery({
    id: id as string,
  });

  const [updateMatrix, { isLoading: updateMatrixLoading }] =
    usePutMatrixByIdMutation({ fixedCacheKey: "update-matrix" });

  const { choices, factors, factorsChoices } = useSelector(
    (state: RootState) => state
  );

  const [name, setName] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setName(data?.name ?? "");
    }
  }, [data?.name, isSuccess]);

  const save = useCallback(() => {
    updateMatrix({
      id: id!,
      matrix: { ...data!, name, choices, factors, factorsChoices },
    });
  }, [choices, data, factors, factorsChoices, id, name, updateMatrix]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleTitleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      updateMatrix({
        id: id!,
        matrix: { ...data!, name, choices, factors, factorsChoices },
      });
    }
  };

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <PageContainer>
      <Stack
        direction={"row"}
        alignItems={"start"}
        justifyContent={"space-between"}
        mb={2}
      >
        <Button
          variant="plain"
          component={Link}
          to={"/"}
          sx={{ alignItems: "end" }}
          size={mobile ? "sm" : "md"}
        >
          <ChevronLeft />
          Back
        </Button>

        <ModeToggle />
      </Stack>

      <LoaderWrapper isLoading={isLoading}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems={{ xs: "start", md: "center" }}
          mb={3}
        >
          <Input
            name={"title"}
            value={name}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            size={mobile ? "sm" : "lg"}
            variant={"plain"}
            disabled={updateMatrixLoading}
            sx={(theme) => ({
              ...(mobile ? theme.typography.h3 : theme.typography.h1),
              lineHeight: "initial",
              pt: 1,
              maxWidth: "100%",
            })}
          />
          <Button
            onClick={save}
            size={mobile ? "sm" : "lg"}
            loading={updateMatrixLoading}
            sx={{ alignItems: "end" }}
          >
            Save&nbsp;
            <Save />
          </Button>
        </Stack>

        <AccordionGroup sx={{ marginBottom: 3 }}>
            <Accordion>
              <AccordionSummary>
                <Typography level={"h3"}>
                  What do I do now?
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>
                  A decision matrix is a tool you can use to help you make a
                  decision. It's similar to a pros and cons list but for more
                  than 2 or more choices and provides known and unknown weights.
                  Here's how it works:
                </Typography>

                <List marker={"decimal"}>
                  <ListItem>
                    Edit the name of your decision at the top of this page.
                  </ListItem>
                  <ListItem>
                    Across the top of the table, edit, add, or remove the choices in your
                    decision.
                  </ListItem>
                  <ListItem>
                    Along the left axis, you can edit, add, or remove factors
                  </ListItem>
                  <ListItem>
                    As you add factors, click (or right click) on the numbers in
                    the grid to add (or remove) weight to each choice's factor.
                  </ListItem>
                  <ListItem>
                    At the bottom of each decision is a bar chart and a
                    comparison, giving you the "winning" choice based on the
                    factors.
                  </ListItem>
                  <ListItem>
                    Returning to a choice and editing or refining the factors
                    and choices is a good way to continue to think about your
                    decision.
                  </ListItem>
                </List>

                <Typography>
                  At the end of the day, a decision is only as sound as the time
                  you put into it (without obsessing over it). Just like a pros
                  and cons list, a decision matrix helps you spend time on and
                  think about a decision before you pull the trigger.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>

        <Table />

        <Totals />
      </LoaderWrapper>
    </PageContainer>
  );
};

export default Matrix;
