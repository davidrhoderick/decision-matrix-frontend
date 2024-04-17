import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const login = createAsyncThunk<
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

    if (response.ok) {
      return response.json();
    }

    const error = await response.text();

    return rejectWithValue(error);
  } catch (error) {
    return rejectWithValue((error as TypeError).message);
  }
});

export const signup = createAsyncThunk<
  AuthResponse,
  { username: string; password: string }
>("auth/signup", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      return response.json();
    }

    const error = await response.text();

    return rejectWithValue(error);
  } catch (error) {
    return rejectWithValue((error as TypeError).message);
  }
});

export const choicesSlice = createSlice({
  name: "choices",
  initialState,
  reducers: {
    clearAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.state = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.session.id;
        state.tokenType = action.payload.tokenType;
        state.state = "fulfilled";
      })
      .addCase(login.rejected, (state) => {
        state.accessToken = "";
        state.tokenType = "";
        state.state = "rejected";
      })
      .addCase(signup.pending, (state) => {
        state.state = "pending";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.accessToken = action.payload.session.id;
        state.tokenType = action.payload.tokenType;
        state.state = "fulfilled";
      })
      .addCase(signup.rejected, (state) => {
        state.accessToken = "";
        state.tokenType = "";
        state.state = "rejected";
      });
  },
});

export const { clearAuth } = choicesSlice.actions;

export default choicesSlice.reducer;
