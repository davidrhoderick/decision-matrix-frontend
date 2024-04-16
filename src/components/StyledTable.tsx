import styled from "@emotion/styled";

const StyledTable = styled.table`
  margin: 1rem 2rem 1rem 4rem;
  border-collapse: collapse;
  display: inline-block;

  th,
  td {
    padding: 1rem;
    text-align: center;
    border: 1px solid #222;
    user-select: none;
    white-space: nowrap;
  }

  td:not(:first-of-type) {
    cursor: pointer;
  }
`;

export default StyledTable;
