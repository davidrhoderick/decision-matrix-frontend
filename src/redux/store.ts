import { configureStore } from "@reduxjs/toolkit";

import auth, { AUTH_LOCAL_STORAGE_KEY } from "./authSlice";
import choices from "./choicesSlice";
import factors from "./factorsSlice";
import factorsChoices from "./factorsChoicesSlice";

const store = configureStore({
  reducer: {
    auth,
    choices,
    factors,
    factorsChoices,
  },
});

store.subscribe(() => {
  localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(store.getState().auth));
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
