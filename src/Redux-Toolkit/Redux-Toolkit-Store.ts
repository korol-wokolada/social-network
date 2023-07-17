import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./Messages-Reducer/Messages-slice";
import profileSlice from "./Profile-Reducer/Profile-slice";
import authSlice from "./Auth-Reducer/Auth-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import usersSlice from "./Users-Reducer/Users-slice";

export const store = configureStore({
  reducer: {
    message: messagesSlice,
    profile: profileSlice,
    auth: authSlice,
    users: usersSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
