import axiosClient from "./axiosClient";

export const authApi = {
  register(payload) {
    return axiosClient.post("/auth/register", payload);
  },

  login(payload) {
    return axiosClient.post("/auth/login", payload);
  },

  refresh(payload) {
    return axiosClient.post("/auth/refresh", payload);
  },
  logout() {
    return axiosClient.post("/auth/logout");
  },
};
