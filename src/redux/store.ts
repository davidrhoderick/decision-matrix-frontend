import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./authSlice";
import choices from "./choicesSlice";
import factors from "./factorsSlice";
import factorsChoices from "./factorsChoicesSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import {matrixApi} from "./matrixApi";

const reducers = combineReducers({
  auth,
  [matrixApi.reducerPath]: matrixApi.reducer,
  choices,
  factors,
  factorsChoices,
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(matrixApi.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
