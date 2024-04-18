import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "@/redux/store";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { CssBaseline } from "@mui/joy";

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
      <CssBaseline />

      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);

export default App;
