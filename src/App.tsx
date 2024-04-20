import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "@/redux/store";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import Matrix from "@/pages/Matrix";
import theme from "./lib/theme";

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
  {
    path: "/matrix/:id",
    element: <Matrix />,
  },
]);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssBaseline />

      <CssVarsProvider theme={theme}>
        <RouterProvider router={router} />
      </CssVarsProvider>
    </PersistGate>
  </Provider>
);

export default App;
