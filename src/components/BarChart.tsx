import styled from "@emotion/styled";
import { CSSProperties, FC } from "react";
import colors from "../lib/colors";

type Props = {
  totals: Array<number | string>;
  max: number;
};

const BarChart: FC<Props> = ({ totals, max }) => (
  <Bar>
    {[...Array(max)].map((_value, index) => {
      if (index < Number(totals[0])) {
        return <Filled key={index} barColor={colors.body} />;
      } else if (index < Number(totals[1])) {
        return <Fuzzy key={index} barColor={colors.grey} />;
      } else {
        return <Empty key={index} barColor={colors.bg} />;
      }
    })}
  </Bar>
);

export default BarChart;

const Bar = styled.div`
  display: flex;
  width: 2rem;
  height: 15rem;
  flex-direction: column-reverse;
`;

const Filled = styled.div`
  background: ${(props: { barColor: CSSProperties["background"] }) =>
    props.barColor};
  flex: 1;
  height: 1rem;
`;

const Fuzzy = styled.div`
  background: ${(props: { barColor: CSSProperties["background"] }) =>
    props.barColor};
  flex: 1;
  height: 1rem;
`;

const Empty = styled.div`
  background: ${(props: { barColor: CSSProperties["background"] }) =>
    props.barColor};
  flex: 1;
  height: 1rem;
`;
