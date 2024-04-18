import LoaderWrapper from "@/components/LoaderWrapper";
import PageContainer from "@/components/PageContainer";
import Table from "@/components/Table";
import Totals from "@/components/Totals";
import { useGetMatrixByIdQuery } from "@/redux/matrixApi";
import { Typography } from "@mui/joy";
import { useParams } from "react-router-dom";

const Matrix = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetMatrixByIdQuery({ id: id as string });

  return (
    <PageContainer>
      <LoaderWrapper isLoading={isLoading}>
        <Typography level="h1">{data?.name}</Typography>

        <Table decisionMatrix={data!} />

        <Totals decisionMatrix={data!}/>
      </LoaderWrapper>
    </PageContainer>
  );
};

export default Matrix;
