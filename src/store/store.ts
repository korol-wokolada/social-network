import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import messagesSlice from "./messagesSlice/messagesSlice";
import profileSlice from "./profileSlice/profileSlice";
import authSlice from "./authSlice/authSlice";
import userSlice from "./usersSlise/userSlice";
import { samuraiJsApi } from "../api/apiSettings";

export const store = configureStore({
  reducer: {
    message: messagesSlice,
    profile: profileSlice,
    auth: authSlice,
    users: userSlice,
    [samuraiJsApi.reducerPath]: samuraiJsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(samuraiJsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
