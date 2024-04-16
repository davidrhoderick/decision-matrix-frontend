import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addFactor, removeFactor } from "./factorsSlice";
import { addChoice, removeChoice } from "./choicesSlice";

export interface FactorsChoicesState {
  matrix: Array<Array<number>>;
}

const initialState = {
  matrix: [
    [1, 2],
    [3, -1],
  ],
};

export const factorsChoicesSlice = createSlice({
  name: "factorsChoices",
  initialState,
  reducers: {
    incrementFactor: (state, action) => {
      state.matrix[action.payload.factor][action.payload.choice]++;

      if (state.matrix[action.payload.factor][action.payload.choice] > 3) {
        state.matrix[action.payload.factor][action.payload.choice] = -1;
      }
    },
    decrementFactor: (state, action) => {
      state.matrix[action.payload.factor][action.payload.choice]--;

      if (state.matrix[action.payload.factor][action.payload.choice] < -1) {
        state.matrix[action.payload.factor][action.payload.choice] = 3;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFactor, (state) => {
        state.matrix.push(state.matrix[0].map(() => 0));
      })
      .addCase(removeFactor, (state, action: PayloadAction<number>) => {
        state.matrix = state.matrix.filter(
          (_factor, index) => index !== action.payload
        );
      })
      .addCase(addChoice, (state) => {
        state.matrix = state.matrix.map((factor) => factor.concat([0]));
      })
      .addCase(removeChoice, (state, action: PayloadAction<number>) => {
        state.matrix = state.matrix.map((factor) =>
          factor.filter((_choice, index) => index !== action.payload)
        );
      });
  },
});

export const { incrementFactor, decrementFactor } = factorsChoicesSlice.actions;

export default factorsChoicesSlice.reducer;
