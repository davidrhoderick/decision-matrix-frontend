import { css, Global } from "@emotion/react";

import styled from "@emotion/styled";

import Table from "./components/Table";
import Totals from "./components/Totals";
import colors from "./lib/colors";
import store from "../redux/store";
import { Provider } from "react-redux";

const App = () => (
  <Provider store={store}>
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: ${colors.body};
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }
      `}
    />

    <Title>Decision Matrix</Title>

    <Table />

    <Totals />
  </Provider>
);

export default App;

const Title = styled.h1`
  margin: 3rem 2rem 2rem;
`;
