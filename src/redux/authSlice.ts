import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  tokenType: string;
  accessToken: string;
}

const initialState: AuthState = {
  tokenType: '',
  accessToken: ''
};

export const choicesSlice = createSlice({
  name: "choices",
  initialState,
  reducers: {
    setAuth: (_state, action: PayloadAction<AuthState>) => action.payload,
    clearAuth: () => initialState,
  },
});

export const { setAuth, clearAuth } = choicesSlice.actions;

export default choicesSlice.reducer;
