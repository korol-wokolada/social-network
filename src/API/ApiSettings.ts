import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "52a956a2-f143-4ec4-bc59-e8f54955c3c0",
  },
});
