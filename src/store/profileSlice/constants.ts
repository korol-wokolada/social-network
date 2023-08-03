import { PostsData, ProfileType } from "./types";

export const initialState = {
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
