import { samuraiJsApi } from "../../api/apiSettings";

export const profileRequests = samuraiJsApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfileRequest: build.query({
      query: (userId: number) => `profile/${userId}`,
      providesTags: ["uploadPhoto"],
    }),

    getStatusRequest: build.query({
      query: (userId) => `/profile/status/${userId}`,
      providesTags: ["updateStatus"],
    }),

    updateStatusRequest: build.mutation({
      query: (status) => ({
        url: `/profile/status/`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["updateStatus"],
    }),

    savePhotoFileRequest: build.mutation({
      query: (photo: File) => {
        const formData = new FormData();
        formData.append("image", photo);

        return {
          url: `/profile/photo`,
          method: "PUT",

          body: formData,
        };
      },
      invalidatesTags: ["uploadPhoto"],
    }),

    // когда буду внедрять в компонент, попробовать переписать этот код через build.query
    setProfileSettingsRequest: build.mutation({
      query: (values) => ({
        url: `/profile/`,
        method: "PUT",
        body: values,
      }),
    }),
  }),
});

export const {
  useGetUserProfileRequestQuery,
  useGetStatusRequestQuery,
  useSavePhotoFileRequestMutation,
  useSetProfileSettingsRequestMutation,
  useUpdateStatusRequestMutation,
} = profileRequests;
