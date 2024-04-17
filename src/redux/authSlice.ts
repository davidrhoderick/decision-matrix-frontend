import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type AuthResponse = {
  tokenType: string;
  session: {
    id: string;
    userId: string;
    fresh: boolean;
    expiresAt: string;
  };
};

type RequestState = "uninitialized" | "pending" | "fulfilled" | "rejected";

export interface AuthState {
  tokenType: string;
  accessToken: string;
  state: RequestState;
}
const initialState: AuthState = {
  tokenType: "",
  accessToken: "",
  state: "uninitialized",
};

export const authenticate = createAsyncThunk<
  AuthResponse,
  { username: string; password: string }
>("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  } catch (error) {
    rejectWithValue(error);
    // if (error.response) {
    //   return rejectWithValue({
    //     status: error.response?.status ? error.response.status : 500,
    //     data: error.response?.data
    //       ? { ...error.response.data }
    //       : { message: "No error data provided" },
    //   });
    // } else {
    //   return rejectWithValue(error.toString());
    // }
  }
});

export const choicesSlice = createSlice({
  name: "choices",
  initialState,
  reducers: {
    setAuth: (_state, action: PayloadAction<AuthState>) => action.payload,
    clearAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.state = "pending";
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.accessToken = action.payload.session.id;
        state.tokenType = action.payload.tokenType;
        state.state = "fulfilled";
      })
      .addCase(authenticate.rejected, (state) => {
        state.accessToken = "";
        state.tokenType = "";
        state.state = "rejected";
      });
  },
});

export const { setAuth, clearAuth } = choicesSlice.actions;

export default choicesSlice.reducer;
