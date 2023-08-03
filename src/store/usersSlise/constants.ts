import { UsersType } from "./types";

export const initialState = {
  users: [] as Array<UsersType> | undefined,
  totalUsersCount: 500 as number | undefined,
  pageSize: 7,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as Array<number>, // array of users ids
};
