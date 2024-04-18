import { useNavigate } from "react-router-dom";
import { MouseEvent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signout } from "@/redux/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useGetIndexQuery } from "@/redux/matrixApi";
import {
  Button,
  Container,
  LinearProgress,
  Stack,
  Table,
  Typography,
} from "@mui/joy";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { username } = useSelector((state: RootState) => state.auth);

  const { data, isLoading, isError, error } = useGetIndexQuery();

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

  const handleDelete = useCallback(
    ({ event, id }: { event: MouseEvent<HTMLAnchorElement>; id: string }) => {
      event.stopPropagation();
      console.log("delete", id);
    },
    []
  );

  return (
    <Container sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <Typography level={"h1"}>Decision Matrix</Typography>

        {isLoading ? (
          <LinearProgress
            color={"neutral"}
            size={"sm"}
            value={33}
            variant={"plain"}
            sx={{ width: "100%" }}
          />
        ) : (
          <>
            <Stack direction={"row"} alignItems={"start"} spacing={2}>
              <Typography level={"h2"}>Welcome {username}!</Typography>

              <Button onClick={handleSignout} variant={"soft"} color="neutral">
                Sign out
              </Button>
            </Stack>

            <Table size="lg">
              <thead>
                <th>Your Decisions</th>
                <th />
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
                        color={"danger"}
                        onClick={(event) => handleDelete({ event, id })}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Home;
