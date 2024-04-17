import { css, Global } from "@emotion/react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import colors from "@/lib/colors";

import store from "@/redux/store";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// eslint-disable-next-line prefer-const
let persistor = persistStore(store);

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
    <PersistGate loading={null} persistor={persistor}>
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
    </PersistGate>
  </Provider>
);

export default App;
