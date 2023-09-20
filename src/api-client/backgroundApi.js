import axiosClient from "./axiosClient";

export const backgroundApi = {
  get() {
    const url = "/cover";
    return axiosClient.get(url);
  },
};
