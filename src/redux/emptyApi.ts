import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.BACKEND_URL}/`,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken, tokenType } = (getState() as RootState).auth;

    // If we have a token set in state, let's assume that we should be passing it.
    if (tokenType && accessToken) {
      headers.set("authorization", `${tokenType} ${accessToken}`);
    }

    return headers;
  },
});

const emptyApi = createApi({
  baseQuery,
  reducerPath: "matrixApi",
  endpoints: () => ({}),
});

export default emptyApi;
