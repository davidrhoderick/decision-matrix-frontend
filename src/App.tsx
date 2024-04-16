import { css, Global } from "@emotion/react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import colors from "@/lib/colors";

import store from "@/redux/store";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Table from "@/components/Table";
import Totals from "@/components/Totals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

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

    <RouterProvider router={router} />

    {/* <Title>Decision Matrix</Title>

    <Table />

    <Totals /> */}
  </Provider>
);

export default App;
