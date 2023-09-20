import axiosClient from "./axiosClient";

export const storyApi = {
  get(id, params) {
    const url = `/story/${id}`;
    return axiosClient.get(url, { params });
  },
  getAll() {
    const url = `/story/storyCode`;
    return axiosClient.get(url);
  },
};
