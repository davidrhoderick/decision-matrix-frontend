import { configureStore } from "@reduxjs/toolkit";

import choices from "./choicesSlice";
import factors from "./factorsSlice";
import factorsChoices from "./factorsChoicesSlice";

const store = configureStore({
  reducer: {
    choices,
    factors,
    factorsChoices,
  },
});


export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
