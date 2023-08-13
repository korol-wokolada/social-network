import { samuraiJsApi } from "../../api/apiSettings";
import { getUsersType } from "./types";

export const usersRequests = samuraiJsApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersRequest: build.query({
      query: ({ currentPage, pageSize }: getUsersType) =>
        `users?page=${currentPage}&count=${pageSize}`,
      providesTags: ["follow", "unfollow"],
    }),

    followUserRequest: build.mutation({
      query: (id) => ({
        url: `follow/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["follow"],
    }),

    unFollowUserRequest: build.mutation({
      query: (id) => ({
        url: `follow/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["unfollow"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetUsersRequestQuery,
  useFollowUserRequestMutation,
  useUnFollowUserRequestMutation,
} = usersRequests;
