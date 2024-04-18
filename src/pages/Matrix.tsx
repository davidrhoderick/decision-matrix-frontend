import LoaderWrapper from "@/components/LoaderWrapper";
import PageContainer from "@/components/PageContainer";
import Table from "@/components/Table";
import Totals from "@/components/Totals";
import { useGetMatrixByIdQuery } from "@/redux/matrixApi";
import { Button, Typography } from "@mui/joy";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Matrix = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetMatrixByIdQuery({ id: id as string });

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
        <Typography level="h1">{data?.name}</Typography>

        <Table />

        <Totals />
      </LoaderWrapper>
    </PageContainer>
  );
};

export default Matrix;
