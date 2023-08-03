import { instance } from "./apiSettings";

export function savePhotoFileRequest(photoFile: File) {
  const formData = new FormData();
  formData.append("image", photoFile);
  return instance.put(`/profile/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function setProfileSettingsRequest(values: number | null) {
  return instance.put(`/profile/`, values);
}

export async function getUserProfileRequest(userId: number) {
  try {
    const response = await instance.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function getStatusRequest(userId: number) {
  return instance.get<string>(`/profile/status/${userId}`);
}
export function updateStatusRequest(status: string) {
  return instance.put(`/profile/status`, { status });
}
