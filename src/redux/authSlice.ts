import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type AuthResponse = {
  tokenType: string;
  session: {
    id: string;
    userId: string;
    fresh: boolean;
    expiresAt: string;
  };
  username: string;
};

type RequestState = "uninitialized" | "pending" | "fulfilled" | "rejected";

export interface AuthState {
  tokenType: string;
  accessToken: string;
  username: string;
  state: RequestState;
}

const initialState: AuthState = {
  tokenType: "",
  accessToken: "",
  username: "",
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

export const signout = createAsyncThunk<boolean>(
  "auth/signout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/signout`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `${(getState() as RootState).auth.tokenType} ${
              (getState() as RootState).auth.accessToken
            }`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        return true;
      }

      const error = await response.text();

      return rejectWithValue(error);
    } catch (error) {
      return rejectWithValue((error as TypeError).message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.state = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.session.id;
        state.tokenType = action.payload.tokenType;
        state.username = action.payload.username;
        state.state = "fulfilled";
      })
      .addCase(login.rejected, (state) => {
        state.accessToken = "";
        state.tokenType = "";
        state.username = "";
        state.state = "rejected";
      })
      .addCase(signup.pending, (state) => {
        state.state = "pending";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.accessToken = action.payload.session.id;
        state.tokenType = action.payload.tokenType;
        state.username = action.payload.username;
        state.state = "fulfilled";
      })
      .addCase(signup.rejected, (state) => {
        state.accessToken = "";
        state.tokenType = "";
        state.username = "";
        state.state = "rejected";
      })
      .addCase(signout.pending, (state) => {
        state.state = "pending";
      })
      .addCase(signout.fulfilled, (state) => {
        state.accessToken = "";
        state.tokenType = "";
        state.username = "";
        state.state = "fulfilled";
      })
      .addCase(signout.rejected, (state) => {
        state.state = "rejected";
      });
  },
});

export default authSlice.reducer;
