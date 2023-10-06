import { samuraiJsApi } from "../../api/apiSettings";
import { IfromInput } from "../../pages/settingsPage/components/SettingProfileForm";

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

    setProfileSettingsRequest: build.mutation({
      query: (values: IfromInput) => {
        const data = {
          aboutMe: values.aboutMe,
          lookingForAJob: values.lookingForAJob,
          fullName: values.fullName,
          contacts: {
            github: values.github,
            vk: values.vk,
            facebook: values.facebook,
            instagram: values.instagram,
            twitter: values.twitter,
          },
          lookingForAJobDescription: values.lookingForAJobDescription,
        };

        return {
          url: `/profile`,
          method: "PUT",
          body: data,
        };
      },
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
