import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PhotosType, PostsData, ProfileType } from "./Profile-Reducer";
import {
  getProfileInformationThunk,
  saveProfilePhotoThunk,
} from "./Profile-thunk";

let initialState = {
  postsData: [
    { id: 1, post: "Post1", like: 5 },
    { id: 2, post: "Post2", like: 5 },
    { id: 3, post: "Post3", like: 5 },
  ] as Array<PostsData>,
  profile: null as ProfileType | null,
  status: "" as string | undefined,
  isProfileLoading: false,
  isPhotoLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateUserStatus: (state, action: PayloadAction<string | undefined>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInformationThunk.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(
        getProfileInformationThunk.fulfilled,
        (state, action: PayloadAction<ProfileType>) => {
          state.isProfileLoading = false;
          state.profile = action.payload;
        }
      )
      .addCase(saveProfilePhotoThunk.pending, (state) => {
        state.isPhotoLoading = true;
      })
      .addCase(
        saveProfilePhotoThunk.fulfilled,
        (state, action: PayloadAction<PhotosType>) => {
          if (state.profile === null) {
            state.isPhotoLoading = false;
            return;
          }
          state.profile.photos = action.payload;
          state.isPhotoLoading = false;
        }
      );
  },
});
export default profileSlice.reducer;
export const { updateUserStatus } = profileSlice.actions;
