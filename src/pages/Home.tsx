import { useNavigate } from "react-router-dom";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signout } from "@/redux/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Matrix,
  useDeleteMatrixByIdMutation,
  useGetIndexQuery,
  usePostMatrixMutation,
} from "@/redux/matrixApi";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  List,
  ListItem,
  Sheet,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import LoaderWrapper from "@/components/LoaderWrapper";
import PageContainer from "@/components/PageContainer";
import ModeToggle from "@/components/ModeToggle";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { username } = useSelector((state: RootState) => state.auth);

  const { data, isLoading, isError, error, isSuccess, isFetching } =
    useGetIndexQuery();

  const handleSignout = useCallback(() => {
    dispatch(signout())
      .then(unwrapResult)
      .then(() => navigate("/login"))
      .catch((error: unknown) => console.error(error));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (
      isError &&
      (error as { originalStatus: number }).originalStatus === 401
    ) {
      navigate("/login");
    }
  }, [isError, error, navigate]);

  const navigateToMatrix = useCallback(
    (id: string) => {
      navigate(`/matrix/${id}`);
    },
    [navigate]
  );

  const [deleteMatrix] = useDeleteMatrixByIdMutation();

  const [deleteLoadingIds, setDeleteLoadingIds] =
    useState<Array<string> | null>(null);

  const handleDelete = useCallback(
    ({ event, id }: { event: MouseEvent<HTMLAnchorElement>; id: string }) => {
      event.stopPropagation();
      setDeleteLoadingIds([...(deleteLoadingIds ?? []), id]);
      deleteMatrix({ id });
    },
    [deleteLoadingIds, deleteMatrix]
  );

  useEffect(() => {
    if (isSuccess) {
      setDeleteLoadingIds(null);
    }
  }, [isSuccess]);

  const [addMatrix, { isLoading: postMatrixLoading }] = usePostMatrixMutation();

  const [newMatrixLoading, setNewMatrixLoading] = useState(false);

  useEffect(() => {
    if (postMatrixLoading || isFetching || isLoading) {
      setNewMatrixLoading(true);
    } else if (isSuccess) {
      setNewMatrixLoading(false);
    }
  }, [isFetching, isLoading, isSuccess, postMatrixLoading]);

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Stack
          direction={"row"}
          alignItems={"start"}
          justifyContent={"space-between"}
          mb={2}
        >
          <Typography level={"h1"}>Decision Matrix</Typography>

          <ModeToggle />
        </Stack>

        <LoaderWrapper isLoading={isLoading}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={"start"}
            spacing={2}
          >
            <Typography level={"h2"}>Welcome {username}!</Typography>

            <Button onClick={handleSignout} variant={"soft"} color="neutral">
              Sign out
            </Button>
          </Stack>

          <AccordionGroup>
            <Accordion sx={{ px: 0 }}>
              <AccordionSummary>
                <Typography level={"h3"}>
                  What is a "decision matrix"?
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
                    Create a new matrix using the button below.
                  </ListItem>
                  <ListItem>
                    Edit the name of your decision at the top of this page.
                  </ListItem>
                  <ListItem>
                    Across the top of the table, edit, add, or remove the
                    choices in your decision.
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

          <Button
            onClick={() =>
              addMatrix().then(
                (result) =>
                  (result as { data: Matrix })?.data?.id &&
                  navigate(`/matrix/${(result as { data: Matrix }).data.id}`)
              )
            }
            sx={{ alignSelf: "start" }}
            loading={newMatrixLoading}
          >
            New Decision Matrix
          </Button>

          <Sheet sx={{ overflow: "auto", mx: -3 }}>
            <Table
              size="lg"
              variant={"plain"}
              sx={{
                "& tr > *:first-child": {
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                },
              }}
            >
              <thead>
                <tr>
                  <th>Your Decisions</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th style={{ width: "120px" }} />
                </tr>
              </thead>

              <tbody>
                {data?.map(({ id, name, createdAt, updatedAt }) => (
                  <tr
                    key={id}
                    onClick={() => navigateToMatrix(id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{name}</td>
                    <td>{new Date(createdAt).toLocaleString()}</td>
                    <td>{new Date(updatedAt).toLocaleString()}</td>
                    <td align="right">
                      <Button
                        size={"sm"}
                        color={"danger"}
                        onClick={(event) => handleDelete({ event, id })}
                        loading={deleteLoadingIds?.includes(id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </LoaderWrapper>
      </Stack>
    </PageContainer>
  );
};

export default Home;
