export type ContactsType = {
  gitHub: string | undefined;
  vk: string | undefined;
  facebook: string | undefined;
  instagram: string | undefined;
  twitter: string | undefined;
  website: string | undefined;
  youtube: string | undefined;
  mainLink: string | undefined;
};
export type PhotosType = {
  small: string | null | undefined;
  large: string | null | undefined;
};

export type ProfileType = {
  aboutMe: string | null;
  userId: number | null;
  lookingForAJob: boolean | null;
  lookingForAJobDescription: string | null;
  fullName: string | null;
  contacts: ContactsType | null;
  photos: PhotosType | null;
};

export type PostsData = {
  id: number;
  post: string;
  like: number;
};
