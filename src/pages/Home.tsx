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
import { Button, Sheet, Stack, Table, Typography } from "@mui/joy";
import LoaderWrapper from "@/components/LoaderWrapper";
import PageContainer from "@/components/PageContainer";

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
        <Typography level={"h1"}>Decision Matrix</Typography>

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
            New Matrix
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
                  <th style={{ width: "80px" }} />
                </tr>
              </thead>

              <tbody>
                {data?.map(({ id, name }) => (
                  <tr
                    key={id}
                    onClick={() => navigateToMatrix(id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{name}</td>
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
