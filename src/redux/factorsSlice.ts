import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { matrixApi } from "./matrixApi";

export interface FactorsState {
  list: Array<string>;
}

const initialState: FactorsState = {
  list: ["Factor 1", "Factor 2"],
};

export const factorsSlice = createSlice({
  name: "factors",
  initialState,
  reducers: {
    addFactor: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload);
    },
    removeFactor: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(
        (_factor, index) => action.payload !== index
      );
    },
    changeFactor: (
      state,
      action: PayloadAction<{ name: string; index: number }>
    ) => {
      state.list[action.payload.index] = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      matrixApi.endpoints.getMatrixById.matchFulfilled,
      (state, action) => {
        state.list = action.payload.factors.list;
      }
    );
  },
});

export const { addFactor, removeFactor, changeFactor } = factorsSlice.actions;

export default factorsSlice.reducer;
