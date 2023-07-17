import { instance } from "./ApiSettings";

export function savePhotoFile(photoFile: File) {
  const formData = new FormData();
  formData.append("image", photoFile);
  return instance.put(`/profile/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function setProfileSettings(values: number | null) {
  return instance.put(`/profile/`, values);
}

export async function getUserProfileApi(userId: number) {
  try {
    const response = await instance.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function getStatus(userId: number) {
  return instance.get<string>(`/profile/status/${userId}`);
}
export function updateStatus(status: string) {
  return instance.put(`/profile/status`, { status });
}
