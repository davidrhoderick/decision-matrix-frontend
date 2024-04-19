import LoaderWrapper from "@/components/LoaderWrapper";
import PageContainer from "@/components/PageContainer";
import Table from "@/components/Table";
import Totals from "@/components/Totals";
import {
  useGetMatrixByIdQuery,
  usePutMatrixByIdMutation,
} from "@/redux/matrixApi";
import { RootState } from "@/redux/store";
import { Button, Input, Stack } from "@mui/joy";
import { ChevronLeft, Save } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Matrix = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useGetMatrixByIdQuery({
    id: id as string,
  });

  const [updateMatrix, { isLoading: updateMatrixLoading }] =
    usePutMatrixByIdMutation();

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

  return (
    <PageContainer>
      <Button
        variant="plain"
        component={Link}
        to={"/"}
        sx={{ alignItems: "end", marginBottom: 2 }}
      >
        <ChevronLeft />
        Back
      </Button>

      <LoaderWrapper isLoading={isLoading}>
        <Stack direction={"row"} spacing={3} alignItems={"center"}>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            size={"lg"}
            variant={"plain"}
            disabled={updateMatrixLoading}
          />
          <Button
            onClick={save}
            loading={updateMatrixLoading}
            sx={{ alignItems: "end" }}
          >
            Save&nbsp;
            <Save />
          </Button>
        </Stack>

        <Table />

        <Totals />
      </LoaderWrapper>
    </PageContainer>
  );
};

export default Matrix;
