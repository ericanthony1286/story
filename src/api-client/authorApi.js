import axiosClient from "./axiosClient";

export const authorApi = {
  get(id, params) {
    const url = `/author/${id}`;
    return axiosClient.get(url, { params });
  },
};
