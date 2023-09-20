import axiosClient from "./axiosClient";

export const topApi = {
  get(id) {
    const url = `/list/${id}`;
    return axiosClient.get(url);
  },
};
