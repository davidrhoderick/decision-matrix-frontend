import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ChoicesState {
  list: Array<string>;
}

const initialState: ChoicesState = {
  list: ["Choice 1", "Choice 2"],
};

export const choicesSlice = createSlice({
  name: "choices",
  initialState,
  reducers: {
    addChoice: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload);
    },
    removeChoice: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(
        (_choice, index) => action.payload !== index
      );
    },
    changeChoice: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      state.list[action.payload.index] = action.payload.name;
    },
  },
});

export const { addChoice, removeChoice, changeChoice } = choicesSlice.actions;

export default choicesSlice.reducer;
